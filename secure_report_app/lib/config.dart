class AppConfig {
  const AppConfig({
    required this.useMocks,
    required this.firebaseReady,
    required this.weatherApiKey,
    required this.weatherBaseUrl,
    required this.weatherLatitude,
    required this.weatherLongitude,
  });

  final bool useMocks;
  final bool firebaseReady;
  final String weatherApiKey;
  final String weatherBaseUrl;
  final double weatherLatitude;
  final double weatherLongitude;

  factory AppConfig.fromEnvironment({required bool firebaseReady}) {
    final bool useMocksFromEnv =
        const bool.fromEnvironment('USE_MOCK_SERVICES', defaultValue: false);
    return AppConfig(
      useMocks: useMocksFromEnv || !firebaseReady,
      firebaseReady: firebaseReady,
      weatherApiKey:
          const String.fromEnvironment('WEATHER_API_KEY', defaultValue: ''),
      weatherBaseUrl: const String.fromEnvironment(
        'WEATHER_API_BASE_URL',
        defaultValue: 'https://api.openweathermap.org/data/2.5/weather',
      ),
      weatherLatitude:
          const double.fromEnvironment('WEATHER_LATITUDE', defaultValue: 38.9907),
      weatherLongitude:
          const double.fromEnvironment('WEATHER_LONGITUDE', defaultValue: -77.0261),
    );
  }
}
