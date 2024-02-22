import { Schema, model } from "mongoose";

export type ScenarioDocument = {
  id: string;
  user: string;
  description: string;
  name: string;
  lastSimulation: string;
  simulated: boolean;
  view(full: boolean): any;
}

const scenarioSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastSimulation: {
    type: Schema.Types.ObjectId,
    ref: "Simulation",
  },
  simulated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

scenarioSchema.methods = {
  view(full: boolean) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      description: this.description,
      name: this.name,
      lastSimulation: this.lastSimulation,
      simulated: this.simulated,
    };

    return full
      ? {
        ...view,
      }
      : view;
  },
};

export const Scenario = model<ScenarioDocument>("Scenario", scenarioSchema);
