import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

type Cursor = {
  page?: number
  limit?: number
  sort?: string
  order?: string
}

export type ListScenariosInput = {
  query?: string
  select?: string
  cursor: Cursor
}

export async function listScenariosUseCase(input): Promise<{ count: number; rows: Array<ScenarioDocument> }> {
  const { query, select, cursor } = input
  const [count, scenarios] = await Promise.all([Scenario.countDocuments(query), Scenario.find(query, select, cursor)])

  return {
    count,
    rows: scenarios.map((scenario) => scenario.view(false)),
  }
}
