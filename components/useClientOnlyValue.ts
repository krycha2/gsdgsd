// Ta funkcja jest dostępna wyłącznie w sieci, ponieważ wersja natywna nie obsługuje obecnie renderowania serwerowego (lub w czasie kompilacji).
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
