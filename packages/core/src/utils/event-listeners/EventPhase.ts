export enum EventPhase {
  All = -1,
  None = 0,
  Capture = 1,
  Target = 2,
  Bubble = 3,
}

export function eventPhaseToEnum(eventPhase: number) {
  switch (eventPhase) {
    case 0:
      return EventPhase.None;
    case 1:
      return EventPhase.Capture;
    case 2:
      return EventPhase.Target;
    case 3:
      return EventPhase.Bubble;
    default:
      return EventPhase.All;
  }
}
