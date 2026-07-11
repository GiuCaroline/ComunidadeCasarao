import { View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/input';
import { useState } from "react";
import { forgotPassword, resetPassword } from '../services/authService';
import { AlertCustom } from "../components/alert";
import LoadingOverlay from '../components/loadingOverlay';

export function EsqueciSenha(){
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const [alerta, setAlerta] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error"
  });
  
  const handleSendEmail = async (e) => {
        setIsLoading(true);
        if (e) e.preventDefault();
        try {
            await forgotPassword(email);
            setStep(2);
            setAlerta({
                visible: true,
                title: "Sucesso",
                message: "E-mail enviado! Verifique sua caixa de entrada.",
                type: "success"
            });
        } catch (error) {
            setAlerta({
                visible: true,
                title: "Erro",
                message: error.error || "Erro ao enviar e-mail",
                type: "error"
            });
        }
        setIsLoading(false);
    };

  const handleResetPassword = async (e) => {
        setIsLoading(true);
        if (e) e.preventDefault();

        if (novaSenha.length < 6) {
            setAlerta({
                visible: true,
                title: "Atenção",
                message: "A nova senha deve ter no mínimo 6 caracteres.",
                type: "warning"
            });
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(email, token, novaSenha);
            setAlerta({
                visible: true,
                title: "Sucesso",
                message: "Senha alterada com sucesso!",
                type: "success"
            });
            setTimeout(() => {
                navigation.navigate("Login");
            }, 2000);
        } catch (error) {
            setAlerta({
                visible: true,
                title: "Erro",
                message: error.error || "Erro ao redefinir senha",
                type: "error"
            });
        }
        setIsLoading(false);
    };

    return(
        <>
        <AlertCustom
            visible={alerta.visible}
            title={alerta.title}
            message={alerta.message}
            type={alerta.type}
            onClose={() => setAlerta({ ...alerta, visible: false })}
        />

        <View className='flex-1 items-center bg-branco dark:bg-preto-dark'>
            <KeyboardAvoidingView 
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >
            <ScrollView contentContainerStyle={{ padding: 10, alignItems:'center' }} className='flex'>
                <Image
                    source={require('../../assets/images/logoPreto.png')}
                    className="w-[60%]  mt-[30%]"
                    resizeMode="contain"
                />
                <View className='items-center'>
                    <Text className="font-popMedium text-[22px] text-vermelho mt-[-10%] mb-[5%]">
                        Esqueci Senha
                    </Text>

                    {step === 1 && (
                        <>
                        <Text className='font-popLight mb-[10%] text-center text-preto dark:text-branco'>
                            {`Iremos enviar um token de verificação no\n seu email como segurança.`}
                        </Text>
            
                        <View className='w-[350px] items-center'>
                            <Input
                                texto='Email'
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
            
                        <TouchableOpacity 
                            className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2"
                            onPress={handleSendEmail}
                            activeOpacity={0.8}
                        >
                            <Text className="text-branco font-popLight text-[16px]">
                                Enviar
                            </Text>
                        </TouchableOpacity>
                        </>
                    )}

                    {step === 2 && (
                        <>
                        <Text className='font-popLight mb-[5%] text-center text-preto dark:text-branco'>
                            {`Digite o token enviado e a nova senha\n para prosseguir.`}
                        </Text>
            
                        <View className='w-[350px] items-center'>
                            <Input
                                texto='Token'
                                value={token}
                                onChangeText={setToken}
                            />
                            <Input 
                                texto='Nova Senha'
                                seguranca={true}
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                            />
                        </View>
            
                        <TouchableOpacity 
                            className="px-16 bg-vermelho rounded-full items-center justify-center mt-2 py-2"
                            onPress={handleResetPassword}
                            activeOpacity={0.8}
                        >
                            <Text className="text-branco font-popLight text-[16px]">
                                Redefinir
                            </Text>
                        </TouchableOpacity>
                            <Text className='font-popLight text-[13px] mt-[7%] text-preto dark:text-branco'>
                                Esse token é válido por 10 minutos.
                            </Text>
                        </>
                    )}

                </View>
    
                <Text className='font-popLight text-[13px] mt-[3%] text-preto dark:text-branco' onPress={() => navigation.navigate('Login')}>
                    Lembrou a senha? Volte pro login clicando <Text className='text-vermelho dark:text-vermelho-dark underline' onPress={() => navigation.navigate('Login')}>aqui</Text>
                </Text>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
        <LoadingOverlay visible={isLoading} />
        </>
    )
}