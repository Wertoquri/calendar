import React from 'react'
import style from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={style.footer}>
      <h3>&copy;Community of stupid programmers inc. All right is our {new Date().getFullYear()}</h3>
    </footer>
  )
}
