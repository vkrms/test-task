import styles from './socials.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { share } from '../redux/socialsSlice'
import { updateUser } from '../redux/userSlice'
import API from '../libs/api-calls'

function openWindow(social, dispatch, id) {
  const popupX = window.innerWidth / 2 - 300
  const popupY = window.innerHeight / 2 - 300
  const windowCfg = `height=600, width=600, top=${popupY}, left=${popupX}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`

  const url = {
    vk: 'https://vk.com/share.php?url=',
    fb: 'https://www.facebook.com/sharer/sharer.php?u=',
    tw: 'https://twitter.com/intent/tweet/?url=',
    ok: 'https://connect.ok.ru/offer?url=',
  }[social]

  const popup = window.open(url + window.location.href, 'share', windowCfg)

  // check if popup closed
  const closedInterval = setInterval(async () => {
    if (popup.closed) {
      const user = await API.updateUser({
        id,
        shared: true,
      })
      dispatch(share())
      dispatch(updateUser(user))
      clearInterval(closedInterval)
    }
  }, 100);
}


export default function Socials() {
  const socials = ['vk', 'fb', 'tw', 'ok']

  const dispatch = useDispatch()
  const id = useSelector(state => state.user.id)

  return (
    <div className="email">
      {socials.map(social => {
        return (
          <button
            className={`${styles.socials__btn} ${styles[social]}`}
            key={social}
            onClick={() => { openWindow(social, dispatch, id) }}
          />
        )
      })}
    </div>
  )
}
