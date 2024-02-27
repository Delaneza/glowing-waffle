import { Schema, model } from 'mongoose'

export type SimulationDocument = {
  id: string
  status: string
  scenario: string
  reference_month: Date
  simulation_cd_id: string
  result: object
  input: object
  user: string
  createdAt: Date
  updatedAt: Date
  view(full: boolean): any
}

const simulationSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['success', 'making obj', 'in progress', 'pending', 'error'],
    },
    scenario: {
      type: Schema.Types.ObjectId,
      ref: 'Scenario',
      required: true,
    },
    reference_month: {
      type: Date,
    },
    simulation_cd_id: {
      type: String,
      unique: true,
      required: true,
    },
    result: {
      type: Object,
    },
    input: {
      type: Object,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

simulationSchema.methods = {
  view(full: boolean) {
    const view = {
      id: this.id,
      status: this.status,
      scenario: this.scenario,
      reference_month: this.reference_month,
      simulation_cd_id: this.simulation_cd_id,
      result: this.result,
      input: this.input,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }

    return full
      ? {
          ...view,
        }
      : view
  },
}

export const Simulation = model<SimulationDocument>('Simulation', simulationSchema)
