// Função serverless (Vercel): cria o link de pagamento no checkout da InfinitePay
// com o preço oficial da cota e devolve { url } para o convite redirecionar.
const PRESENTES = require('./_presentes');

const INFINITE_TAG = 'antonia-monikelly'; // InfiniteTag sem o "$"

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const presente = PRESENTES[Number(body.id)];
  if (!presente) return res.status(400).json({ erro: 'Cota inválida.' });

  const origem = `https://${req.headers.host}/`;
  const redirect = typeof body.redirect_url === 'string' && body.redirect_url.startsWith(origem)
    ? body.redirect_url
    : origem + '?presente=ok#gifts';

  try {
    const r = await fetch('https://api.infinitepay.io/invoices/public/checkout/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: INFINITE_TAG,
        order_nsu: `cota-${body.id}-${Date.now()}`,
        redirect_url: redirect,
        items: [{ quantity: 1, price: Math.round(presente.valor * 100), description: `Presente: ${presente.nome}`.slice(0, 100) }],
      }),
    });
    const data = await r.json().catch(() => ({}));
    const url = data.url || data.payment_url;
    if (!r.ok || !url) {
      console.error('[infinitepay]', r.status, data);
      return res.status(502).json({ erro: 'Não foi possível abrir o pagamento.' });
    }
    return res.status(200).json({ url });
  } catch (e) {
    console.error('[infinitepay]', e);
    return res.status(502).json({ erro: 'Não foi possível abrir o pagamento.' });
  }
};
