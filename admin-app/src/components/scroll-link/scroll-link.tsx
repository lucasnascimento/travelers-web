import * as React from 'react'

interface Props {
  to: string;
  offset?: number;
  children: React.ReactNode;
}

export const ScrollLink = ({ children, offset = 0, to }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.querySelector(to)

    if (target) {
      const targetPosition = target.getBoundingClientRect().top
        + window.pageYOffset
      const adjustedPosition = targetPosition - offset
      window.scrollTo({
        behavior: 'smooth',
        top: adjustedPosition,
      })
    }
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
