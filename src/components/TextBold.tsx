type TextBoldProps = {
  children: React.ReactNode
  as?: 'p' | 'span'
}

export const TextBold = ({ as = 'span', children }: TextBoldProps) => {
  const Component = as

  return <Component className="font-semibold text-lg">{children}</Component>
}
