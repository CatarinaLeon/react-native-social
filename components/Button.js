import { TouchableOpacity } from "react-native"
import { Feather } from '@expo/vector-icons'; 

const Button = () => { 
    return (
        <TouchableOpacity>
            <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
    )
}
export default Button