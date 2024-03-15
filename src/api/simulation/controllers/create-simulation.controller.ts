import { Request, Response } from 'express'
import { createSimulationUseCase } from '../usecases'

type SendEventData = {
  status: number
  result: any
}

export async function createSimulationController(req: Request, res: Response) {
  const { user } = req
  const { scenario, reference_month, simulation_cd_id } = req.body

  setSSEHeaders(res)

  const sendEvent = (data: SendEventData) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  const closeConnection = () => {
    res.end()
  }

  await createSimulationUseCase({ user, scenario, reference_month, simulation_cd_id, sendEvent, closeConnection })
}

function setSSEHeaders(res: Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
}
