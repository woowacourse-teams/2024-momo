export function isTouchEvent(event: Event): event is TouchEvent {
  return 'ontouchstart' in window && event.type.startsWith('touch');
}

export function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

export function decideDragEventTarget(event: Event) {
  let target;

  if (isTouchEvent(event) && event.touches) {
    const { clientX, clientY } = event.touches[0];
    target = document.elementFromPoint(clientX, clientY);
  } else if (isMouseEvent(event)) {
    target = event.target;
  }

  return target;
}

export function getTableCellElement(event: Event): HTMLTableCellElement | null {
  const targetElement = decideDragEventTarget(event);

  if (targetElement instanceof HTMLTableCellElement && targetElement.tagName === 'TD') {
    return targetElement;
  }

  return null;
}

export function getTableCellIndex(event: Event) {
  let rowIndex: number | null = null;
  let colIndex: number | null = null;

  const target = getTableCellElement(event);

  if (!target) {
    return null;
  }

  const tr = target.closest('tr');

  if (tr) {
    const tds = Array.from(tr.querySelectorAll('td'));

    rowIndex = tr.sectionRowIndex;
    colIndex = tds.findIndex((td) => td === target);
  }

  if (rowIndex === null || colIndex === null || colIndex === -1) {
    return null;
  }

  return { rowIndex, colIndex: colIndex - 1 };
}
