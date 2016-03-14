export const LOAD = 'LOAD';

export function load(data) {
  return {
    type: LOAD,
    data,
  };
}

