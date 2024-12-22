

class JetStorage {
    private instance: JetStorage
    private constructor(){
        this.instance = new JetStorage()
    }
    static getStorage() {
    }
}

const jetStorage = JetStorage.getStorage()
export { jetStorage as JetStorage }