
import { useTranslation } from 'react-i18next'

export default function SignOut({navigation}) {
    const {t} = useTranslation()
    

    useEffect(() => {
        console.log('Hola')
        
        navigation.navigate(t('home'))
    }, [])

  return (
    <View>
      <Text>SignOut</Text>
    </View>
  )
}