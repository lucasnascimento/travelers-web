// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const listItinerariesEntriesData = {
  data: [
    {
      description: '<p>06h30 Despertar e café da manhã</p>\n<p>Transfer para a Instituição - Início dos trabalhos</p>\n<p>Almoço no local - Serve Festa - Churrasquinho</p>\n<p>Retorno para o Hotel</p>\n<p>Lazer e jogos / piscina e quadras</p>\n<p>19h30 Jantar Hotel</p>\n<p>Sala de Eventos - fechamento das atividades e planejamento do dia seguinte</p>\n<p>22h00 Pernoite</p>',
      id: 'c5c8ec3f-fd74-4bfb-b3a7-eebab8fec793',
      inserted_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
      is_deleted: false,
      itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
      position: 2,
      title: 'Dia 2 - Etapa 2 Mão na Massa - 06/06',
      updated_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
    },
    {
      description: '<p>7h00 - Saída da Escola com destino a Casa Abrigo em Boituva.</p>\n<p>09h00 Chegada prevista na Instituição</p>\n<p>09h30 Recepção e Café da manhã</p>\n<p>Início das atividades</p>\n<p>Almoço - Serve Festa - Churrasquinho</p>\n<p>Saída para o Hotel - Brisa Hotel em Sorocaba - https://www.hotelfazendabrisaitu.com.br/</p>\n<p>Lazer e jogos / piscina e quadras</p>\n<p>19h30 Jantar Hotel</p>\n<p>Sala de Eventos - fechamento das atividades e planejamento do dia seguinte</p>\n<p>22h00 Pernoite</p>',
      id: '17f04a96-05c5-426a-a516-4886fffcfdd3',
      inserted_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
      is_deleted: false,
      itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
      position: 1,
      title: 'Dia 1 - Etapa 2 Mão na Massa - 05/06',
      updated_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
    },
    {
      description: '<p>7h00 - Saída da Escola com destino a Casa Abrigo em Boituva</p>\n<p>09h00 Chegada prevista na Instituição</p>\n<p>09h30 Recepção e Café da manhã</p>\n<p>10h00-12h30 - Atividades: - Abertura e Subdivisão dos grupos para levantamento do mão na massa</p>\n<p>12h30 Saída para Almoço</p>\n<p>14h30 Retorno para São Paulo com chegada prevista para às 17h00</p>',
      id: 'e0677f47-7e07-414b-a370-38bda7c8b1e2',
      inserted_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
      is_deleted: false,
      itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
      position: 0,
      title: 'Etapa 1 - Visita Técnica - Dia 23/04 - 3ªf',
      updated_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
    },
    {
      description: '<p>06h30 Despertar e café da manhã</p>\n<p>08h30/09h00 Instituição</p>\n<p>Entrega do Evento - Integração - Despedida</p>\n<p>Almoço - Restaurante do Hotel</p>\n<p>Sala de Eventos - fechamento do projeto</p>\n<p>15h00 Partida para São Paulo</p>\n<p>17h00 Chegada prevista nas Unidades</p>',
      id: '622d7c77-00db-496b-a5e6-86f32f747130',
      inserted_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
      is_deleted: false,
      itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
      position: 3,
      title: 'Dia 3 - Etapa 2 Mão na Massa - 07/06',
      updated_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
    },
  ],
}

export const listItinerariesEntries = http.get(
  `${variables.API_BASE_URL}api/admin/itinerary/:id/entry`,
  () => HttpResponse.json({
    status: 200,
    ...listItinerariesEntriesData,
  })
)
