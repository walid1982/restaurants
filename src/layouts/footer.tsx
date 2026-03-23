

export default function Footer() {
  return (
    <footer className="main-footer" >
      <div className="footer-content">
        <span>© {new Date().getFullYear()} SixApp. Tous droits réservés.</span>
        <span>
          <a href="#contact" className="footer-link">Contact</a> |
          <a href="#mentions" className="footer-link">Mentions légales</a>
        </span>
      </div>
    </footer>
  )
}


