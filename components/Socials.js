import styles from './socials.module.scss'

function openWindow(social, callback) {
  const popupX = window.innerWidth / 2 - 300
  const popupY = window.innerHeight / 2 - 300
  const windowCfg = `height=600, width=600, top=${popupY}, left=${popupY}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`

  let url = ''

  switch (social) {
    case 'vk':
      url = 'https://vk.com/share.php?url='
      break
    case 'fb':
      url = 'https://www.facebook.com/sharer/sharer.php?u='
      break
    case 'tw':
      url = 'https://twitter.com/intent/tweet/?url='
      break
    case 'ok':
      url = 'https://connect.ok.ru/offer?url='
      break
    default:
      return false
  }

  const popup = window.open(url + window.location.href, 'share', windowCfg)

  // check if popup closed
  const closedInterval = setInterval(function () {
    if (popup.closed) {
      console.log('popup closed!')
      callback()
      clearInterval(closedInterval)
    }
  }, 100);

}


export default function Socials(props) {
  const socials = ['vk', 'fb', 'tw', 'ok']

  return (
    <div className="email">
      {socials.map(social => {
        return (
          <button
            className={`${styles.socials__btn} ${styles[social]}`}
            key={social}
            onClick={() => { openWindow(social, props.onComplete) }}
          />
        )
      })}
    </div>
  )
}
