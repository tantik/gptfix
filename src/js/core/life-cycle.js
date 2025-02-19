// Определение декораторов

export function Initiate(target) {
    console.log(`Initiating: ${target.name}`);
}

export function Listener(target, propertyKey, descriptor) {
    console.log(`Listening on: ${propertyKey}`);
}

// Другие декораторы
export function Bind(eventName) {
    return function (target, key, descriptor) {
        console.log(`Binding event: ${eventName} to ${key}`);
        return descriptor;
    };
}

export function Singleton(target) {
    let instance;
    return function (...args) {
        if (!instance) {
            instance = new target(...args);
        }
        return instance;
    };
}

export function State(initialState) {
    return function (target, key) {
        Object.defineProperty(target, key, {
            get() {
                return this[`_${key}`] || initialState;
            },
            set(value) {
                this[`_${key}`] = value;
            }
        });
    };
}

// Экспортируем как именованные экспорты
