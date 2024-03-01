import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateSimulationUseCase } from '../usecases'

export const CreateSimulationDTO = z.object({
  scenario: z.string(),
  reference_month: z.string(),
  simulation_cd_id: z.string(),
})

type SendEventData = {
  status: number
  result: any
}

export async function CreateSimulationController(req: Request, res: Response) {
  const { userId: user } = req
  const { scenario, reference_month, simulation_cd_id } = req.body

  setSSEHeaders(res)

  const sendEvent = (data: SendEventData) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  const closeConnection = () => {
    res.end()
  }

  await CreateSimulationUseCase({ user, scenario, reference_month, simulation_cd_id, sendEvent, closeConnection })
}

function setSSEHeaders(res: Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
}
