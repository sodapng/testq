import { CheckboxGroupProvider } from '../CheckboxGroup.context'

type CheckboxGroupProps = {
  children: React.ReactNode
  value: string[]
  onChange: (value: string[]) => void
  label?: React.ReactNode
  className?: string
}

export const CheckboxGroup = ({
  children,
  onChange,
  value,
  label,
  className,
}: CheckboxGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemValue = event.currentTarget.value

    onChange(
      value.includes(itemValue)
        ? value.filter((item) => item !== itemValue)
        : [...value, itemValue]
    )
  }

  return (
    <CheckboxGroupProvider value={{ value, onChange: handleChange }}>
      <div className={className}>
        {label && <h2>{label}</h2>}
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </CheckboxGroupProvider>
  )
}
