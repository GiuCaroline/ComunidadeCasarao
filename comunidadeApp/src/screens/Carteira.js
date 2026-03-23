import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Nav } from "../components/nav";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../services/authService";
import { useEffect, useState } from "react";

export function Carteira() {
    const navigation = useNavigation();

    const { user } = useAuth();
    const [usuario, setUsuario] = useState(null);

    const cargos = [
        { value: "1", label: "Cooperador" },
        { value: "2", label: "Discipulador" },
        { value: "3", label: "Equipe de Intercessão" },
        { value: "4", label: "Funcionário" },
        { value: "5", label: "Líder de Departamento" },
        { value: "6", label: "Líder de GR" },
        { value: "7", label: "Líder de Ministério" },
        { value: "8", label: "Membro" },
        { value: "9", label: "Pastor" },
        { value: "10", label: "STAFF ILUMINAÇÃO" },
        { value: "11", label: "STAFF MÍDIA" },
        { value: "12", label: "STAFF PROJEÇÃO" },
        { value: "13", label: "STAFF SOM" },
        { value: "14", label: "STAFF VÍDEO" },
        { value: "15", label: "Visitante" },
    ];
    const cargosUsuario = [
        usuario?.cargo,
        usuario?.cargo2,
        usuario?.cargo3,
        usuario?.cargo4
    ]
    .filter(c => c) 
    .map(c => cargos.find(item => item.value == c)?.label)
    .filter(c => c);


    useEffect(() => {
        async function carregarUsuario() {
        try {
            const data = await getUserById(user.id);
            setUsuario(data);
        } catch (error) {
            console.log(error);
        }
        }

        if (user?.id) {
        carregarUsuario();
        }
    }, [user]);

    
    function formatarData(data) {
        if (!data) return "";

        const d = new Date(data);

        return d.toLocaleDateString("pt-BR");
    }

    function formatarMesAnoCustom(data) {
        if (!data) return "";

        const d = new Date(data);

        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const mes = meses[d.getMonth()];
        const ano = d.getFullYear();

        return `${mes}/${ano}`;
    }

    const getBase64Image = async () => {
        const asset = Asset.fromModule(require('../../assets/images/logoPreto.png'));
        await asset.downloadAsync();

        const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
            encoding: 'base64',
        });

        return `data:image/png;base64,${base64}`;
    };

    const gerarPDF = async () => {
        try {
            const logoBase64 = await getBase64Image();

            const html = `
            <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background: #ffffff;
                        font-family: Arial, sans-serif;
                    }

                    .card {
                        width: 300px;
                        background: #F0F0F0;
                        padding: 20px;
                        border-radius: 20px;
                    }

                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .logo img {
                        width: 120px;
                    }

                    .name {
                        font-size: 18px;
                        font-weight: normal;
                    }

                    .cargo {
                        font-size: 14px;
                        margin-bottom: 15px;
                        font-weight: 300;
                    }

                    .row {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                    }

                    .label {
                        font-size: 16px;
                        font-weight: normal;
                    }

                    .value {
                        font-size: 12px;
                        font-weight: 300;
                    }

                    .footer {
                        font-size: 8px;
                        margin-top: 20px;
                        text-align: center;
                        font-weight: 300;
                    }

                    .codigo {
                        margin-right: 10px;
                    }
                </style>
                </head>

                <body>
                <div class="card">
                    
                    <div class="logo">
                        <img src="${logoBase64}" />
                    </div>

                    <div class="name">${usuario?.nome}</div>
                    <div class="cargo">${cargosUsuario.join(", ")}</div>

                    <div class="row">
                    <div>
                        <div class="label">Data de Nascimento</div>
                        <div class="value">${formatarData(usuario?.dtanasc)}</div>
                    </div>
                    <div class="codigo">
                        <div class="label">Código</div>
                        <div class="value"> ${usuario?.id}</div>
                    </div>
                    </div>

                    <div class="row">
                    <div>
                        <div class="label">Membro Desde</div>
                        <div class="value">${formatarMesAnoCustom(usuario?.membrodesde)}</div>
                    </div>
                    <div>
                        <div class="label">Batismo</div>
                        <div class="value">${formatarData(usuario?.dtabatismo)}</div>
                    </div>
                    </div>

                    <div class="row">
                    <div>
                        <div class="label">Data de Emissão</div>
                        <div class="value">${formatarData(usuario?.data_aceite_termos)}</div>
                    </div>
                    <div>
                        <div class="label">Telefone Igreja</div>
                        <div class="value">(11) 4555-0002</div>
                    </div>
                    </div>

                    <div style="margin-top: 10px;">
                    <div class="label">Congregação</div>
                    <div class="value">Comunidade Casarão</div>
                    </div>

                    <div class="footer">
                    É assegurada, nos termos da lei, a prestação de assistência religiosas nas entidades civis e militares de internação coletiva. Artigo 5, inciso VII, CF.
                    </div>
                </div>
                </body>
            </html> `;

            const { uri } = await Print.printToFileAsync({ html });

            const novoCaminho = `${FileSystem.documentDirectory}credencial_membro_${usuario?.id}.pdf`;

            await FileSystem.moveAsync({
                from: uri,
                to: novoCaminho,
            });

            await Sharing.shareAsync(novoCaminho);

        } catch (error) {
            console.log("Erro ao gerar PDF:", error);
        }
        };



  return (
    <View className="flex-1 bg-branco dark:bg-preto-dark">
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Perfil")}
        >
            <View className='w-full flex-row items-center px-[4%] mt-[16%]'>
                <ArrowLeft className='text-preto dark:text-branco' />
                <Text className='ml-[4%] mt-[1%] text-[18px] font-popRegular text-preto dark:text-branco'>Credencial</Text>
            </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 85 }} className='flex'>
            <TouchableOpacity 
                activeOpacity={0.8}
                className='items-end px-[5%] mt-[13%]'
                onPress={gerarPDF}
            >
                <View className='bg-vermelho px-10 py-1 rounded-full'> 
                    <Text className='text-branco font-popRegular text-[17px]'>Baixar</Text>
                </View>
            </TouchableOpacity>

            <View className='items-center mt-[6%]'>
                <View className='w-[95%] px-5 py-5 bg-input dark:bg-input-dark rounded-[20px]'
                style={styles.sombra}
            >  
                    <View className='items-center'>
                        <Image
                            source={require('../../assets/images/logoPreto.png')}
                            className="w-[35%] mt-[-27%] mb-[-20%]"
                            resizeMode="contain"
                        />
                    </View>
                    
                    <View className=' items-start'>
                        <View className='items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>{usuario?.nome}</Text>
                            <Text className="text-[13px] font-popLight text-preto dark:text-branco">{cargosUsuario.join(", ")}</Text>
                        </View>
                    </View>

                    <View className='flex-row justify-between'>
                        <View className='mt-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Data de Nascimento</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{formatarData(usuario?.dtanasc)}</Text>
                        </View>
                        <View className='mt-[5%] mr-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Código</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco"> {usuario?.id}</Text>
                        </View>
                    </View>

                    <View className='flex-row justify-between'>
                        <View className='mt-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Membro Desde</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{formatarMesAnoCustom(usuario?.membrodesde)}</Text>
                        </View>
                        <View className='mt-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Batismo</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{formatarData(usuario?.dtabatismo)}</Text>
                        </View>
                    </View>

                    <View className='flex-row justify-between'>
                        <View className='mt-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Data de Emissão</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco">{formatarData(usuario?.data_aceite_termos)}</Text>
                        </View>
                        <View className='mt-[5%] items-start'>
                            <Text className='font-popRegular text-base text-preto dark:text-branco'>Telefone Igreja</Text>
                            <Text className="text-[15px] font-popLight text-preto dark:text-branco">(11) 4555-0002</Text>
                        </View>
                    </View>

                    <View className='mt-[5%] items-start'>
                        <Text className='font-popRegular text-base text-preto dark:text-branco'>Congregação</Text>
                        <Text className="text-[15px] font-popLight text-preto dark:text-branco">Comunidade Casarão</Text>
                    </View>
                    
                    <View className='items-center flex mt-[10%]'>
                        <Text className='text-center font-popLight text-[10px]'>É assegurada, nos termos da lei, a prestação de assistência religiosas nas entidades civis e militares de internação  coletiva. Artigo 5, inciso VII, CF.</Text>
                    </View>
                </View>
                

            </View>
        </ScrollView>
      <Nav
        active="Perfil"
        onChange={(r) => navigation.navigate(r)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 6,
    }
});
