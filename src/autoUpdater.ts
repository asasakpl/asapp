import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'
import log from 'electron-log'

autoUpdater.on('error', error => {
  log.error(error)
})

autoUpdater.on('update-available', () => {
  // Make notification for user
  log.info('There is update avaiable, it will be downloaded in background')
})

autoUpdater.on('update-downloaded', () => {
  // Make
  dialog.showMessageBox(
    {
      type: 'info',
      title: 'Update installation',
      message:
        'To install update choose yes below or update will be installed after app restart',
      buttons: ['Yes', 'No']
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.quitAndInstall()
      } else {
        log.info('Update will be installed after app restart')
      }
    }
  )
})

const autoUpdate = () => {
  autoUpdater.checkForUpdatesAndNotify()
}

export default autoUpdate
