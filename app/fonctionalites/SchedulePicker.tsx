import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from 'app/apiConfig.js'; // Adjust path if needed
import { useAuthStore } from './VariablesGlobales';

const weekdays = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

export default function SchedulePicker({ onClose }) {
  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(8, 0, 0, 0); // ✅ Set initial time to 08:00
    return date;
  });

  const [selectedDays, setSelectedDays] = useState([]);
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
    const targetCoords = [targetLong, targetLat];
    const targetAddress = await reverseGeocode(targetCoords);
    const rideCoords = [userLong, userLat];
    const pickupAddress = await reverseGeocode(rideCoords);


    const payload = {
      userId: userId,
      long: userLong,
      lat: userLat,
      targetLong: targetLong,
      targetLat: targetLat,
      scheduleDays: selectedDays,
      scheduleTime: formatTime(time),
      pickupAddress,
      targetAddress,

    };

    console.log("📅 Selected days:", selectedDays);
    console.log("📦 Sending to backend:", payload);
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
        onClose?.({ days: selectedDays, time: formatTime(time) });
      } else {
        console.error("❌ Server error:", result);
        Alert.alert("Erreur", "Erreur serveur: " + (result.msg || "Erreur inconnue"));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      Alert.alert("Erreur", "Impossible de se connecter au serveur");
    }
  };

  return (
    <View
      style={{
        padding: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
    >
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

      <TouchableOpacity
        onPress={handleConfirm}
        style={{
          backgroundColor: '#2ecc71',
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
