import './Header.css'

interface IHeader {
  title?: string
}

export const Header = ({ title = 'Dio Bank' }: IHeader) => {
  return (
    <header className='header'>
      <h1 className='header__title'>{title}</h1>
    </header>
  )
}
