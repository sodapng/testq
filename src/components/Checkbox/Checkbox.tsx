import { useCheckboxGroupContext } from './CheckboxGroup.context'
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup'

type CheckboxProps = {
  label?: React.ReactNode
  disabled?: boolean
  value: string
}

export const Checkbox = ({ label, value, disabled }: CheckboxProps) => {
  const ctx = useCheckboxGroupContext()

  const contextProps = ctx
    ? {
        checked: ctx.value.includes(value),
        onChange: ctx.onChange,
      }
    : {}

  return (
    <label className="flex gap-2 cursor-pointer">
      <input
        type="checkbox"
        value={value}
        disabled={disabled}
        {...contextProps}
      />
      {label}
    </label>
  )
}

Checkbox.Group = CheckboxGroup
