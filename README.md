# Convite — Ronaldinho & Monikelly

Convite digital do casamento (17/12/2026, 15h30 — Lounge Conceito, Iparana, Caucaia/CE).

- `index.html` — o convite. Tudo que muda fica no bloco **CONFIGURAÇÃO** e na lista **PRESENTES**, no fim do arquivo.
- `fotos/` — foto dos noivos, foto do local, monograma e textura de papel.
- `presentes/` — fotos das 15 cotas (01.jpg … 15.jpg, na mesma ordem da lista).

## Confirmação de presença (RSVP)
A lista de convidados fica em `CONVIDADOS` no `index.html`: cada linha é um convite (família/grupo).
O convidado digita o nome, escolhe o convite, marca quem vai / não vai e toca em **Avisar aos noivos**,
que abre o WhatsApp (`rsvpWhatsapp`) com a mensagem pronta.

## Pix
Chave e-mail `ronaldinhoemonikelly@gmail.com` (Mercado Pago — Antonia Monikelly Cavalcante Araujo).
Cada cota gera o Pix copia e cola com o valor já preenchido.

## Cartão (InfinitePay)
O botão **Cartão** de cada cota abre o checkout da InfinitePay na InfiniteTag `$antonia-monikelly`.
- Hospedado na **Vercel**: usa a função `api/cartao.js`, com os preços oficiais de `api/_presentes.js`
  (ao mudar nome ou valor de uma cota, altere no `index.html` **e** em `api/_presentes.js`).
- Em outro host (ex.: GitHub Pages): o convite chama a API da InfinitePay direto do navegador.
Depois do pagamento, o convidado volta ao convite e vê um "Muito obrigado!".

A música (Salmo 126) toca pelo YouTube, num player oculto, quando o convidado toca em "toque para abrir".
