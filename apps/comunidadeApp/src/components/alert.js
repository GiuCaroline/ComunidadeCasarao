import { Text, View, Modal } from "react-native";
import { WarningCircle, CheckCircle, XCircle } from "phosphor-react-native";
import { useEffect } from "react";

export function AlertCustom({
  visible,
  onClose,
  title,
  message,
  type = "error", 
  }){
    const config = {
        error: {
        color: "#BB1C00",
        bgColor: "#FFAD9E",
        Icon: XCircle,
        },
        warning: {
        color: "#FFDD00",
        bgColor: "#FFFFA3",
        Icon: WarningCircle,
        },
        success: {
        color: "#16A34A",
        bgColor: "#D8FFCE",
        Icon: CheckCircle,
        },
    };

    const { color, bgColor, Icon } = config[type];

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
            onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
        }, [visible]);

    return(
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalBackground} >
        <View className=" rounded-[25px] w-[80%] py-[2%] items-start gap-2 mr-[4%] mt-[10%] flex-row " style={{ backgroundColor: bgColor }}>

          <Icon size={48} color={color} />

            <View className='flex justify-center items-start'>
                <Text
                    className="text-[16px] font-popRegular "
                >
                    {title}
                </Text>

                <Text className="text-start text-[14px] text-black">
                    {message}
                </Text>

            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        alignItems: "flex-end",
    }
};