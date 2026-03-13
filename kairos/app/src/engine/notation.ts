import type { Position, MoveRecord } from './types';
import { PIECE_ABBREV } from './types';
import { posToLabel } from './board';

export function moveToNotation(record: MoveRecord): string {
  const abbr = PIECE_ABBREV[record.pieceType];
  const from = posToLabel(record.from);
  const to = posToLabel(record.to);

  let notation = '';

  if (record.kind === 'rangedCapture') {
    notation = `${abbr}${from}⊕${to}`;
  } else if (record.kind === 'capture') {
    notation = `${abbr}${from}×${to}`;
  } else {
    notation = `${abbr}${from}→${to}`;
  }

  if (record.promotion) {
    notation += `=${PIECE_ABBREV[record.promotion]}`;
  }

  if (record.chargeTo) {
    const chargeTo = posToLabel(record.chargeTo);
    if (record.chargeCaptured) {
      notation += ` ⚡×${chargeTo}`;
    } else {
      notation += ` ⚡${chargeTo}`;
    }
  }

  if (record.isPress) {
    notation = `[P] ${notation}`;
  }

  return notation;
}

export function positionToFileRank(pos: Position): string {
  return posToLabel(pos);
}
