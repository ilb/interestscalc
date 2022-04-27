# Процентная ведомость

## Сущности

```mermaid
classDiagram
      class InterestStatement{
          PeriodValue balances
          PeriodValue rates
          +constructor(balances, rates)
          +calcInterests(begDate, endDate)
      }
      link InterestStatement "#InterestStatement" "InterestStatement"

      class PeriodValue{
          Map map
          +constructor(map)
          +get(date)
      }

      InterestStatement ..o PeriodValue: использует
```

### InterestStatement

Сущность формирует процентную ведомость за период. Выписка разбивается на периоды постоянства ставки и остатка и на месяцы (%% за каждый месяц рассчитываются раздельно).

Входные данные:
| Поле      | Описание |
| ----------- | ----------- |
| balances      | остатки на дату       |
| rates   | ставки на дату        |
| begDate   | дата начала ведомости   |
| endDate   | дата окончания ведомости  |

Выходные данные:
Таблица
