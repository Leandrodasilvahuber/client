interface IProvider {
    getWeather(): Promise<Array<String>>;
}