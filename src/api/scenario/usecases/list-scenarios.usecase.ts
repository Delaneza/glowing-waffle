import { Scenario, ScenarioDocument } from "../scenario.module";

type Cursor = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export type ListScenariosInput = {
  name?: string;
  description?: string;
  cursor: Cursor
};

export async function ListScenariosUseCase(input: ListScenariosInput): Promise<ScenarioDocument[]> {
  const { cursor, name, description } = input;
  const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = cursor;

  const skip = (page - 1) * limit;

  const query = {
    name: { $regex: name || '', $options: 'i' },
    description: { $regex: description || '', $options: 'i' }
  };

  const sortQuery = { sort: { [sort]: order === 'desc' ? -1 : 1 } };

  const scenarios = await Scenario.find(query, {}, sortQuery)
    .skip(skip)
    .limit(limit)
    .exec();

  return scenarios.map(scenario => scenario.view(false));
}