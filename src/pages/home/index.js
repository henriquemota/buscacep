import React, { useState } from 'react'
import axios from 'axios'
import { ActivityIndicator, View, Text, TextInput, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default function Home() {
  const [cep, setCEP] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleButton() {
    setLoading(true)
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => setEndereco(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  console.log(endereco)

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ alignSelf: 'center', margin: 20, marginTop: 50 }}>
        Busca CEP
      </Text>
      <TextInput
        keyboardType='number-pad'
        maxLength={8}
        style={{
          textAlign: 'center',
          fontSize: 20,
          alignSelf: 'center',
          width: '80%',
          height: 40,
          borderBottomColor: '#333',
          borderBottomWidth: 3,
          margin: 20,
          padding: 10,
        }}
        onChangeText={(e) => setCEP(e)}
      />
      <Button title='processar' onPress={handleButton} />
      {loading && <ActivityIndicator size='large' color='blue' />}
      {endereco && <DetailsAddress data={endereco} />}
    </View>
  )
}

function DetailsAddress(props) {
  const { cep, logradouro, complemento, bairro, localidade, uf } = props.data

  console.log(props.data)
  return (
    <View
      style={{
        backgroundColor: '#f3f3f3',
        margin: 20,
        borderRadius: 8,
        padding: 10,
      }}
    >
      <Text style={{ marginBottom: 10 }}>CEP {cep}</Text>
      <Text style={{ marginBottom: 10 }}>{logradouro}</Text>
      <Text style={{ marginBottom: 10 }}>{complemento || 'NA'}</Text>
      <Text style={{ marginBottom: 10 }}>{bairro}</Text>
      <Text style={{}}>
        {localidade} - {uf}
      </Text>
    </View>
  )
}
