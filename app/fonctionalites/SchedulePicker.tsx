import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from 'app/apiConfig.js';
import { useAuthStore } from './VariablesGlobales';

const weekdays = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

export default function SchedulePicker({ onClose }) {
  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(8, 0, 0, 0);
    return date;
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [places, setPlaces] = useState('');
  const userLat = useAuthStore((state) => state.userLat);
  const userLong = useAuthStore((state) => state.userLong);
  const targetLat = useAuthStore((state) => state.targetLat);
  const targetLong = useAuthStore((state) => state.targetLong);
  const userId = useAuthStore((state) => state.userId);

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

  const toRadians = (degrees) => degrees * (Math.PI / 180);

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

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleConfirm = async () => {
    const parsedPlaces = parseInt(places);
    if (!parsedPlaces || parsedPlaces <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un nombre de places valide.');
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
      scheduleDays: selectedDays,
      scheduleTime: formatTime(time),
      pickupAddress,
      targetAddress,
      distance: calculerDistance(userLong, userLat, targetLong, targetLat),
      places: parsedPlaces, // ✅ CORRECT
    };

    console.log('🛰️ Payload envoyé:', payload);

    Alert.alert("Envoi", "Tentative d'envoi du trajet...");

    try {
      const response = await fetch(`${BASE_URL}/api/trajets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Saved:", result);
        Alert.alert("Succès", "Trajet enregistré !");
        onClose?.({ days: selectedDays, time: formatTime(time), places: parsedPlaces });
      } else {
        console.error("❌ Server error:", result);
        Alert.alert("Erreur", "Erreur serveur: " + (result.msg || "Erreur inconnue"));
      }
    } catch (err) {
      console.error("📡 Network error:", err);
      Alert.alert("Erreur", "Impossible de se connecter au serveur");
    }
  };

  const isFormValid =
    selectedDays.length > 0 &&
    places.trim() !== '' &&
    parseInt(places) > 0;

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
        {weekdays.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => toggleDay(day)}
            style={{
              backgroundColor: selectedDays.includes(day) ? '#2ecc71' : '#ccc',
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

      <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Nombre de places disponibles</Text>
      <TextInput
        placeholder="Ex: 3"
        keyboardType="numeric"
        value={places}
        onChangeText={setPlaces}
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
