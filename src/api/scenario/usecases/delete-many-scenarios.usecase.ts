import { Scenario } from "../scenario.module";

type DeleteManyScenariosUseCaseInput = {
  ids: string[];
}

type DeleteManyScenariosUseCaseOutput = {
  success: boolean;
  deletedCount: number;
  undeletedIds?: string[];
}

export async function DeleteManyScenariosUseCase(input: DeleteManyScenariosUseCaseInput): Promise<DeleteManyScenariosUseCaseOutput> {
  const scenarios = await Scenario.find({ _id: { $in: input.ids } });
  const notFoundScenarios = input.ids.filter(id => !scenarios.find(scenario => scenario.id === id));

  const scenariosToDelete = scenarios.filter(scenario => !notFoundScenarios.includes(scenario.id));

  const { acknowledged, deletedCount } = await Scenario.deleteMany({ _id: { $in: scenariosToDelete } });

  return { success: acknowledged, deletedCount, undeletedIds: notFoundScenarios }
}