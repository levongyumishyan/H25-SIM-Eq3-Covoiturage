import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from 'app/apiConfig.js';
import { useAuthStore } from './VariablesGlobales';

// Cette classe possède les fonctionalités nécessaires 
// permettant à l'utilisateur de planifier son trajet
// à l'aide d'un horaire qu'il peut créer.

const joursDeLaSemaine = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

export default function SelecteurHoraire({ onClose }) {
  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(8, 0, 0, 0);
    return date;
  });

  const [joursChoisis, setJoursChoisis] = useState([]);
  const [sieges, setSieges] = useState(''); // Nombre de sièges disponibles dans la voiture

  // Coordonnées de l'utilisateur ou le point de départ
  // (latitude et longitude)
  const userLat = useAuthStore((state) => state.userLat);
  const userLong = useAuthStore((state) => state.userLong);

  // Coordonnées de la destination choisie
  // (latitude et longitude)
  const targetLat = useAuthStore((state) => state.targetLat);
  const targetLong = useAuthStore((state) => state.targetLong);

  // La variable "userId" sert à associer un trajet à
  // un compte spécifique. Ceci est utile pour afficher
  // les trajets créés par l'utilisateur dans la page
  // 'Historique trajets'.
  const userId = useAuthStore((state) => state.userId);

  /**
   * Cette méthode traduit les coordonnées envoyées sous forme
   * d'un tableau contenant la latitude et la longitude en une adresse.
   * @param tabLatLong
   * @returns 
   */
  const reverseGeocode = async ([lng, lat]) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.EXPO_PUBLIC_ACCESS_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.features[0]?.place_name || '';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return '';
    }
  };

  // Utilisation des formules mathématiques pour
  // calculer la distance du trajet choisi.
  const calculerDistance = (long, lat, targetLong, targetLat) => {
    const dLat = toRadians(targetLat - lat);
    const dLon = toRadians(targetLong - long);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat)) * Math.cos(toRadians(targetLat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c;
    return (Math.round(distance * 100) / 100).toFixed(2);
  };

  // Convertir les angles de degrés en radians.
  const toRadians = (degrees) => degrees * (Math.PI / 180);


  /**
   * Cette méthode convertit la date pour l'afficher en heures et en minutes.
   * @param date 
   * @returns 
   */
  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const incrementTime = () => {
    const next = new Date(time);
    next.setMinutes(time.getMinutes() + 30);
    setTime(next);
  };

  const decrementTime = () => {
    const prev = new Date(time);
    prev.setMinutes(time.getMinutes() - 30);
    setTime(prev);
  };

  /**
   * Gére la sélection d'une ou des journées choisies
   * @param day La journée choisie
   */
  const toggleDay = (day) => {
    setJoursChoisis((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  /**
   * Envoie au serveur du backend les informations
   * du trajet offert. Le trajet sera alors affiché 
   * sur la carte pour les autres utilisateurs.
   * @returns 
   */
const handleConfirm = async () => {
  const parsedsieges = parseInt(sieges);
  if (!parsedsieges || parsedsieges <= 0) {
    Alert.alert('Erreur', 'Veuillez entrer un nombre de sieges valide.');
    return;
  }

  const pickupAddress = await reverseGeocode([userLong, userLat]);
  const targetAddress = await reverseGeocode([targetLong, targetLat]);


  const payload = {
    userId,
    long: userLong,
    lat: userLat,
    targetLong,
    targetLat,
    scheduleDays: joursChoisis,
    scheduleTime: formatTime(time),
    pickupAddress,
    targetAddress,
    distance: calculerDistance(userLong, userLat, targetLong, targetLat),
    places: parsedsieges,
  };


  Alert.alert("Envoi", "Tentative d'envoi du trajet...");

  try {
    const response = await fetch(`${BASE_URL}/api/trajets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert("Succès", "Trajet enregistré !");
      onClose?.();
    } else {
      Alert.alert("Erreur", result.message || "Échec de l'enregistrement du trajet.");
    }
  } catch (error) {
    console.error("❌ Error sending payload:", error);
    Alert.alert("Erreur", "Une erreur s'est produite lors de l'envoi.");
  }
};

  const isFormValid =
    joursChoisis.length > 0 &&
    sieges.trim() !== '' &&
    parseInt(sieges) > 0;

    // Apparence du sélecteur d'horaire
  return (
    <View style={{
      padding: 24,
      backgroundColor: '#fff',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      elevation: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Choisissez l'heure
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={decrementTime} style={{ marginHorizontal: 20 }}>
          <Ionicons name="remove-circle-outline" size={36} color="#2ecc71" />
        </TouchableOpacity>

        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#333' }}>
          {formatTime(time)}
        </Text>

        <TouchableOpacity onPress={incrementTime} style={{ marginHorizontal: 20 }}>
          <Ionicons name="add-circle-outline" size={36} color="#2ecc71" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        {joursDeLaSemaine.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => toggleDay(day)}
            style={{
              backgroundColor: joursChoisis.includes(day) ? '#2ecc71' : '#ccc',
              borderRadius: 20,
              margin: 4,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 11 }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Nombre de sieges disponibles</Text>
      <TextInput
        placeholder="Ex: 3"
        keyboardType="numeric"
        value={sieges}
        onChangeText={setSieges}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleConfirm}
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? '#2ecc71' : '#ccc',
          padding: 12,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirmer</Text>
      </TouchableOpacity>
    </View>
  );
}
