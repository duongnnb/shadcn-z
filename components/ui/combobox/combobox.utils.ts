export function getValueField<TData, TValue extends keyof TData>(
  item: TData,
  valueField: TValue
) {
  const value = item[valueField];
  return `${value}`;
}

export function getLabelField<TData, TLabel extends keyof TData>(
  item: TData,
  labelField: TLabel
) {
  const label = item[labelField];
  return typeof label === "string" ? label : `${label}`;
}
