import React, { useState, useEffect, useRef } from 'react';
import { Play, Users, SkipForward, CheckCircle, Pause, RotateCcw, Trophy, Zap, Timer, X } from 'lucide-react';

// Complete database of 200 cards
const CARDS_DATABASE = [
  // LEVEL 1: 35 cards (4 tabù, 1 punto)
  { id: 1, word: "FORCHETTA", taboo: ["Cucchiaio", "Mangiare", "Posate", "Coltello"], level: 1, points: 1 },
  { id: 2, word: "OMBRELLO", taboo: ["Pioggia", "Aprire", "Protezione", "Acqua"], level: 1, points: 1 },
  { id: 3, word: "SCARPA", taboo: ["Piede", "Camminare", "Calzare", "Scarpe"], level: 1, points: 1 },
  { id: 4, word: "ZAINO", taboo: ["Scuola", "Spalle", "Borsa", "Portare"], level: 1, points: 1 },
  { id: 5, word: "BOTTIGLIA", taboo: ["Acqua", "Plastica", "Bere", "Contenitore"], level: 1, points: 1 },
  { id: 6, word: "PENNA", taboo: ["Scrivere", "Inchiostro", "Foglio", "Matita"], level: 1, points: 1 },
  { id: 7, word: "TAVOLO", taboo: ["Legno", "Mangiare", "Sedia", "Superficie"], level: 1, points: 1 },
  { id: 8, word: "LETTO", taboo: ["Dormire", "Materasso", "Camera", "Cuscino"], level: 1, points: 1 },
  { id: 9, word: "SPECCHIO", taboo: ["Riflesso", "Vetro", "Guardarsi", "Immagine"], level: 1, points: 1 },
  { id: 10, word: "CHIAVE", taboo: ["Porta", "Aprire", "Serratura", "Metallo"], level: 1, points: 1 },
  { id: 11, word: "TELEFONO", taboo: ["Chiamare", "Cellulare", "Numero", "Smartphone"], level: 1, points: 1 },
  { id: 12, word: "LIBRO", taboo: ["Leggere", "Pagine", "Storia", "Autore"], level: 1, points: 1 },
  { id: 13, word: "OROLOGIO", taboo: ["Tempo", "Ore", "Polso", "Minuti"], level: 1, points: 1 },
  { id: 14, word: "SEDIA", taboo: ["Sedere", "Tavolo", "Gambe", "Sedersi"], level: 1, points: 1 },
  { id: 15, word: "FINESTRA", taboo: ["Vetro", "Casa", "Guardare", "Aprire"], level: 1, points: 1 },
  { id: 16, word: "COLTELLO", taboo: ["Tagliare", "Lama", "Cucina", "Forchetta"], level: 1, points: 1 },
  { id: 17, word: "BICCHIERE", taboo: ["Bere", "Acqua", "Vetro", "Tazza"], level: 1, points: 1 },
  { id: 18, word: "PIATTO", taboo: ["Mangiare", "Tavola", "Cucina", "Cibo"], level: 1, points: 1 },
  { id: 19, word: "LAMPADA", taboo: ["Luce", "Accendere", "Buio", "Lampadina"], level: 1, points: 1 },
  { id: 20, word: "PORTA", taboo: ["Entrare", "Casa", "Chiudere", "Uscire"], level: 1, points: 1 },
  { id: 21, word: "TAZZA", taboo: ["Caffè", "Bere", "Manico", "Tè"], level: 1, points: 1 },
  { id: 22, word: "MATITA", taboo: ["Scrivere", "Penna", "Disegnare", "Grafite"], level: 1, points: 1 },
  { id: 23, word: "COMPUTER", taboo: ["Tastiera", "Schermo", "Internet", "Mouse"], level: 1, points: 1 },
  { id: 24, word: "BICICLETTA", taboo: ["Pedalare", "Ruote", "Ciclista", "Bici"], level: 1, points: 1 },
  { id: 25, word: "AUTOMOBILE", taboo: ["Guidare", "Macchina", "Strada", "Auto"], level: 1, points: 1 },
  { id: 26, word: "CAPPELLO", taboo: ["Testa", "Indossare", "Berretto", "Cappuccio"], level: 1, points: 1 },
  { id: 27, word: "GUANTI", taboo: ["Mani", "Freddo", "Inverno", "Dita"], level: 1, points: 1 },
  { id: 28, word: "CALENDARIO", taboo: ["Date", "Mese", "Giorno", "Anno"], level: 1, points: 1 },
  { id: 29, word: "VALIGIA", taboo: ["Viaggio", "Bagaglio", "Vestiti", "Portare"], level: 1, points: 1 },
  { id: 30, word: "SPAZZOLINO", taboo: ["Denti", "Pulire", "Bagno", "Dentifricio"], level: 1, points: 1 },
  { id: 31, word: "ASCIUGAMANO", taboo: ["Bagnato", "Asciugare", "Bagno", "Stoffa"], level: 1, points: 1 },
  { id: 32, word: "FRIGORIFERO", taboo: ["Freddo", "Cibo", "Conservare", "Cucina"], level: 1, points: 1 },
  { id: 33, word: "DIVANO", taboo: ["Sedere", "Salotto", "Morbido", "Poltrone"], level: 1, points: 1 },
  { id: 34, word: "TELEVISIONE", taboo: ["Guardare", "Schermo", "Telecomando", "Programmi"], level: 1, points: 1 },
  { id: 35, word: "RADIO", taboo: ["Musica", "Ascoltare", "Frequenza", "Notizie"], level: 1, points: 1 },

  // LEVEL 2: 40 cards (4 tabù, 2 punti)
  { id: 26, word: "AMICIZIA", taboo: ["Amico", "Rapporto", "Affetto", "Legame"], level: 2, points: 2 },
  { id: 27, word: "VACANZA", taboo: ["Viaggiare", "Estate", "Riposo", "Mare"], level: 2, points: 2 },
  { id: 28, word: "COMPLEANNO", taboo: ["Festa", "Torta", "Anni", "Regalo"], level: 2, points: 2 },
  { id: 29, word: "FAME", taboo: ["Mangiare", "Cibo", "Stomaco", "Appetito"], level: 2, points: 2 },
  { id: 30, word: "PAURA", taboo: ["Spaventare", "Terrore", "Emozione", "Tremare"], level: 2, points: 2 },
  { id: 31, word: "FELICITÀ", taboo: ["Gioia", "Sorridere", "Allegria", "Contentezza"], level: 2, points: 2 },
  { id: 32, word: "TRISTEZZA", taboo: ["Piangere", "Lacrime", "Dolore", "Depressione"], level: 2, points: 2 },
  { id: 33, word: "RABBIA", taboo: ["Arrabbiato", "Urlo", "Nervoso", "Ira"], level: 2, points: 2 },
  { id: 34, word: "AMORE", taboo: ["Cuore", "Innamorato", "Bacio", "Sentimento"], level: 2, points: 2 },
  { id: 35, word: "SOGNO", taboo: ["Dormire", "Notte", "Immaginare", "Desiderio"], level: 2, points: 2 },
  { id: 36, word: "LAVORO", taboo: ["Ufficio", "Soldi", "Impiego", "Fatica"], level: 2, points: 2 },
  { id: 37, word: "SCUOLA", taboo: ["Studenti", "Insegnante", "Lezione", "Classe"], level: 2, points: 2 },
  { id: 38, word: "FAMIGLIA", taboo: ["Genitori", "Figli", "Casa", "Parenti"], level: 2, points: 2 },
  { id: 39, word: "SPORT", taboo: ["Calcio", "Giocare", "Atleta", "Allenamento"], level: 2, points: 2 },
  { id: 40, word: "MUSICA", taboo: ["Canzone", "Suonare", "Cantare", "Strumento"], level: 2, points: 2 },
  { id: 41, word: "CINEMA", taboo: ["Film", "Schermo", "Attore", "Regista"], level: 2, points: 2 },
  { id: 42, word: "VIAGGIO", taboo: ["Partire", "Aereo", "Destinazione", "Valigia"], level: 2, points: 2 },
  { id: 43, word: "CIBO", taboo: ["Mangiare", "Cucinare", "Ristorante", "Piatto"], level: 2, points: 2 },
  { id: 44, word: "SALUTE", taboo: ["Malattia", "Dottore", "Medicina", "Benessere"], level: 2, points: 2 },
  { id: 45, word: "NATURA", taboo: ["Alberi", "Verde", "Ambiente", "Animali"], level: 2, points: 2 },
  { id: 46, word: "CITTÀ", taboo: ["Case", "Strada", "Abitanti", "Urbano"], level: 2, points: 2 },
  { id: 47, word: "MARE", taboo: ["Acqua", "Spiaggia", "Onde", "Pesci"], level: 2, points: 2 },
  { id: 48, word: "MONTAGNA", taboo: ["Vetta", "Neve", "Sciare", "Altezza"], level: 2, points: 2 },
  { id: 49, word: "GIOCO", taboo: ["Giocare", "Divertimento", "Carte", "Bambini"], level: 2, points: 2 },
  { id: 50, word: "NOTTE", taboo: ["Buio", "Stelle", "Dormire", "Luna"], level: 2, points: 2 },
  { id: 51, word: "COLAZIONE", taboo: ["Mattina", "Mangiare", "Latte", "Cornetto"], level: 2, points: 2 },
  { id: 52, word: "PRANZO", taboo: ["Mezzogiorno", "Pasto", "Mangiare", "Tavola"], level: 2, points: 2 },
  { id: 53, word: "CENA", taboo: ["Sera", "Mangiare", "Pasto", "Tavola"], level: 2, points: 2 },
  { id: 54, word: "FREDDO", taboo: ["Ghiaccio", "Inverno", "Temperatura", "Brivido"], level: 2, points: 2 },
  { id: 55, word: "CALDO", taboo: ["Estate", "Temperatura", "Sole", "Sudare"], level: 2, points: 2 },
  { id: 56, word: "PIOGGIA", taboo: ["Acqua", "Cadere", "Ombrello", "Tempo"], level: 2, points: 2 },
  { id: 57, word: "SOLE", taboo: ["Giallo", "Caldo", "Cielo", "Estate"], level: 2, points: 2 },
  { id: 58, word: "LUNA", taboo: ["Notte", "Cielo", "Satellite", "Chiara"], level: 2, points: 2 },
  { id: 59, word: "VENTO", taboo: ["Aria", "Soffiare", "Forte", "Muovere"], level: 2, points: 2 },
  { id: 60, word: "NEVE", taboo: ["Bianca", "Freddo", "Inverno", "Cadere"], level: 2, points: 2 },
  { id: 61, word: "NUVOLA", taboo: ["Cielo", "Bianca", "Pioggia", "Grigia"], level: 2, points: 2 },
  { id: 62, word: "ARCOBALENO", taboo: ["Colori", "Pioggia", "Sole", "Cielo"], level: 2, points: 2 },
  { id: 63, word: "TEMPORALE", taboo: ["Pioggia", "Tuono", "Fulmine", "Forte"], level: 2, points: 2 },
  { id: 64, word: "FULMINE", taboo: ["Tuono", "Temporale", "Luce", "Elettrico"], level: 2, points: 2 },
  { id: 65, word: "TUONO", taboo: ["Rumore", "Temporale", "Fulmine", "Cielo"], level: 2, points: 2 },

  // LEVEL 3: 35 cards (4 tabù, 3 punti)
  { id: 51, word: "LIBERTÀ", taboo: ["Libero", "Schiavitù", "Diritto", "Indipendenza"], level: 3, points: 3 },
  { id: 52, word: "DEMOCRAZIA", taboo: ["Voto", "Politica", "Popolo", "Governo"], level: 3, points: 3 },
  { id: 53, word: "NOSTALGIA", taboo: ["Passato", "Ricordi", "Malinconia", "Rimpianto"], level: 3, points: 3 },
  { id: 54, word: "TRADIZIONE", taboo: ["Costume", "Antico", "Cultura", "Passato"], level: 3, points: 3 },
  { id: 55, word: "IRONIA", taboo: ["Sarcasmo", "Battuta", "Sottinteso", "Ridicolo"], level: 3, points: 3 },
  { id: 56, word: "GIUSTIZIA", taboo: ["Legge", "Tribunale", "Giudice", "Equità"], level: 3, points: 3 },
  { id: 57, word: "CORAGGIO", taboo: ["Paura", "Eroe", "Sfida", "Audacia"], level: 3, points: 3 },
  { id: 58, word: "ONESTÀ", taboo: ["Sincero", "Verità", "Leale", "Retto"], level: 3, points: 3 },
  { id: 59, word: "RISPETTO", taboo: ["Educazione", "Stima", "Considerazione", "Dignità"], level: 3, points: 3 },
  { id: 60, word: "BELLEZZA", taboo: ["Bello", "Estetica", "Brutto", "Arte"], level: 3, points: 3 },
  { id: 61, word: "SAGGEZZA", taboo: ["Saggio", "Conoscenza", "Esperienza", "Intelligente"], level: 3, points: 3 },
  { id: 62, word: "PAZIENZA", taboo: ["Aspettare", "Calma", "Tolleranza", "Nervoso"], level: 3, points: 3 },
  { id: 63, word: "ORGOGLIO", taboo: ["Fiero", "Superbia", "Vanto", "Soddisfazione"], level: 3, points: 3 },
  { id: 64, word: "SPERANZA", taboo: ["Desiderio", "Futuro", "Ottimismo", "Fiducia"], level: 3, points: 3 },
  { id: 65, word: "CREATIVITÀ", taboo: ["Arte", "Inventare", "Immaginazione", "Originale"], level: 3, points: 3 },
  { id: 66, word: "SOLITUDINE", taboo: ["Solo", "Isolamento", "Abbandonato", "Tristezza"], level: 3, points: 3 },
  { id: 67, word: "IDENTITÀ", taboo: ["Chi", "Persona", "Nome", "Riconoscere"], level: 3, points: 3 },
  { id: 68, word: "CULTURA", taboo: ["Arte", "Tradizione", "Società", "Civiltà"], level: 3, points: 3 },
  { id: 69, word: "PROGRESSO", taboo: ["Avanti", "Sviluppo", "Miglioramento", "Futuro"], level: 3, points: 3 },
  { id: 70, word: "MEMORIA", taboo: ["Ricordare", "Passato", "Dimenticare", "Mente"], level: 3, points: 3 },
  { id: 71, word: "FIDUCIA", taboo: ["Credere", "Affidabile", "Sicurezza", "Fidare"], level: 3, points: 3 },
  { id: 72, word: "DUBBIO", taboo: ["Incertezza", "Non", "Sicuro", "Domanda"], level: 3, points: 3 },
  { id: 73, word: "CERTEZZA", taboo: ["Sicuro", "Sapere", "Dubbio", "Convinto"], level: 3, points: 3 },
  { id: 74, word: "VERGOGNA", taboo: ["Imbarazzo", "Rossore", "Timidezza", "Sentire"], level: 3, points: 3 },
  { id: 75, word: "INVIDIA", taboo: ["Gelosia", "Desiderare", "Altri", "Volere"], level: 3, points: 3 },
  { id: 76, word: "GRATITUDINE", taboo: ["Grazie", "Riconoscenza", "Ringraziare", "Apprezzare"], level: 3, points: 3 },
  { id: 77, word: "PERDONO", taboo: ["Scusare", "Perdonare", "Sbaglio", "Accettare"], level: 3, points: 3 },
  { id: 78, word: "VENDETTA", taboo: ["Rivalsa", "Punire", "Torto", "Ripagare"], level: 3, points: 3 },
  { id: 79, word: "COMPASSIONE", taboo: ["Pietà", "Empatia", "Sofferenza", "Sentire"], level: 3, points: 3 },
  { id: 80, word: "UMILTÀ", taboo: ["Modesto", "Orgoglio", "Semplice", "Superbia"], level: 3, points: 3 },
  { id: 81, word: "VANITÀ", taboo: ["Specchio", "Apparenza", "Bello", "Narcisismo"], level: 3, points: 3 },
  { id: 82, word: "GENEROSITÀ", taboo: ["Dare", "Altruismo", "Condividere", "Egoismo"], level: 3, points: 3 },
  { id: 83, word: "EGOISMO", taboo: ["Solo", "Pensare", "Avaro", "Generosità"], level: 3, points: 3 },
  { id: 84, word: "AMBIZIONE", taboo: ["Obiettivo", "Successo", "Desiderio", "Carriera"], level: 3, points: 3 },
  { id: 85, word: "PIGRIZIA", taboo: ["Lento", "Non", "Fare", "Poltrona"], level: 3, points: 3 },

  // LEVEL 4: 35 cards (5 tabù, 4 punti)
  { id: 71, word: "FOTOSINTESI", taboo: ["Pianta", "Sole", "Clorofilla", "Verde", "Ossigeno"], level: 4, points: 4 },
  { id: 72, word: "ALGORITMO", taboo: ["Computer", "Programma", "Calcolo", "Matematica", "Codice"], level: 4, points: 4 },
  { id: 73, word: "METAFORA", taboo: ["Figura", "Retorica", "Paragone", "Similitudine", "Linguaggio"], level: 4, points: 4 },
  { id: 74, word: "BUROCRAZIA", taboo: ["Ufficio", "Documenti", "Statale", "Lento", "Moduli"], level: 4, points: 4 },
  { id: 75, word: "INFLAZIONE", taboo: ["Prezzi", "Economia", "Soldi", "Aumentare", "Euro"], level: 4, points: 4 },
  { id: 76, word: "ECOSISTEMA", taboo: ["Ambiente", "Natura", "Animali", "Piante", "Equilibrio"], level: 4, points: 4 },
  { id: 77, word: "GRAVITÀ", taboo: ["Terra", "Cadere", "Peso", "Newton", "Forza"], level: 4, points: 4 },
  { id: 78, word: "EVOLUZIONE", taboo: ["Darwin", "Specie", "Mutazione", "Selezione", "Adattamento"], level: 4, points: 4 },
  { id: 79, word: "COSTITUZIONE", taboo: ["Legge", "Stato", "Diritti", "Governo", "Carta"], level: 4, points: 4 },
  { id: 80, word: "CAPITALISMO", taboo: ["Economia", "Mercato", "Soldi", "Impresa", "Profitto"], level: 4, points: 4 },
  { id: 81, word: "PSICOLOGIA", taboo: ["Mente", "Cervello", "Pensieri", "Comportamento", "Freud"], level: 4, points: 4 },
  { id: 82, word: "FILOSOFIA", taboo: ["Pensiero", "Ragionare", "Verità", "Esistenza", "Socrate"], level: 4, points: 4 },
  { id: 83, word: "ARCHEOLOGIA", taboo: ["Scavi", "Antico", "Reperti", "Storia", "Passato"], level: 4, points: 4 },
  { id: 84, word: "GENETICA", taboo: ["DNA", "Eredità", "Geni", "Cromosomi", "Biologia"], level: 4, points: 4 },
  { id: 85, word: "RELATIVITÀ", taboo: ["Einstein", "Tempo", "Spazio", "Fisica", "Velocità"], level: 4, points: 4 },
  { id: 86, word: "MITOLOGIA", taboo: ["Dei", "Greci", "Leggende", "Miti", "Antichi"], level: 4, points: 4 },
  { id: 87, word: "ARCHITETTURA", taboo: ["Edificio", "Costruire", "Design", "Casa", "Progetto"], level: 4, points: 4 },
  { id: 88, word: "LINGUISTICA", taboo: ["Lingua", "Parole", "Grammatica", "Parlare", "Studio"], level: 4, points: 4 },
  { id: 89, word: "ASTRONOMIA", taboo: ["Stelle", "Pianeti", "Spazio", "Telescopio", "Universo"], level: 4, points: 4 },
  { id: 90, word: "PROPAGANDA", taboo: ["Politica", "Manipolare", "Messaggio", "Convincere", "Ideologia"], level: 4, points: 4 },
  { id: 91, word: "CENSURA", taboo: ["Vietare", "Proibire", "Informazione", "Nascondere", "Governo"], level: 4, points: 4 },
  { id: 92, word: "RIVOLUZIONE", taboo: ["Cambiamento", "Ribellione", "Governo", "Popolo", "Violenza"], level: 4, points: 4 },
  { id: 93, word: "DITTATURA", taboo: ["Potere", "Governo", "Democrazia", "Autoritario", "Oppressione"], level: 4, points: 4 },
  { id: 94, word: "ANARCHIA", taboo: ["Caos", "Governo", "Ordine", "Libertà", "Regole"], level: 4, points: 4 },
  { id: 95, word: "MONARCHIA", taboo: ["Re", "Regina", "Corona", "Trono", "Ereditario"], level: 4, points: 4 },
  { id: 96, word: "REPUBBLICA", taboo: ["Presidente", "Stato", "Elezioni", "Governo", "Cittadini"], level: 4, points: 4 },
  { id: 97, word: "IMMUNITÀ", taboo: ["Difesa", "Corpo", "Malattia", "Protezione", "Sistema"], level: 4, points: 4 },
  { id: 98, word: "VACCINO", taboo: ["Iniezione", "Malattia", "Protezione", "Ago", "Immunità"], level: 4, points: 4 },
  { id: 99, word: "ANTIBIOTICO", taboo: ["Medicina", "Batteri", "Cura", "Farmaco", "Infezione"], level: 4, points: 4 },
  { id: 100, word: "DIAGNOSI", taboo: ["Malattia", "Medico", "Esame", "Scoprire", "Sintomi"], level: 4, points: 4 },
  { id: 101, word: "TERAPIA", taboo: ["Cura", "Trattamento", "Medico", "Guarire", "Paziente"], level: 4, points: 4 },
  { id: 102, word: "SINTOMO", taboo: ["Malattia", "Segno", "Dolore", "Febbre", "Manifestazione"], level: 4, points: 4 },
  { id: 103, word: "CHIRURGIA", taboo: ["Operazione", "Bisturi", "Medico", "Tagliare", "Sala"], level: 4, points: 4 },
  { id: 104, word: "ANESTESIA", taboo: ["Dormire", "Operazione", "Non", "Sentire", "Dolore"], level: 4, points: 4 },
  { id: 105, word: "RADIOGRAFIA", taboo: ["Raggi", "Ossa", "Immagine", "Esame", "Ospedale"], level: 4, points: 4 },

  // LEVEL 5: 30 cards (5 tabù, 5 punti)
  { id: 91, word: "EGEMONIA", taboo: ["Potere", "Dominio", "Controllo", "Supremazia", "Influenza"], level: 5, points: 5 },
  { id: 92, word: "ENTROPIA", taboo: ["Disordine", "Caos", "Fisica", "Termodinamica", "Energia"], level: 5, points: 5 },
  { id: 93, word: "EMPATIA", taboo: ["Sentire", "Comprendere", "Emozioni", "Compassione", "Altri"], level: 5, points: 5 },
  { id: 94, word: "SERENDIPITÀ", taboo: ["Caso", "Fortuna", "Scoperta", "Inaspettato", "Coincidenza"], level: 5, points: 5 },
  { id: 95, word: "RESILIENZA", taboo: ["Resistere", "Difficoltà", "Adattamento", "Forza", "Superare"], level: 5, points: 5 },
  { id: 96, word: "PARADIGMA", taboo: ["Modello", "Schema", "Riferimento", "Esempio", "Visione"], level: 5, points: 5 },
  { id: 97, word: "CATARSI", taboo: ["Purificazione", "Emozione", "Liberazione", "Teatro", "Sollievo"], level: 5, points: 5 },
  { id: 98, word: "ALIENAZIONE", taboo: ["Estraneo", "Distacco", "Società", "Isolamento", "Marx"], level: 5, points: 5 },
  { id: 99, word: "UTOPIA", taboo: ["Ideale", "Perfetto", "Società", "Impossibile", "Sogno"], level: 5, points: 5 },
  { id: 100, word: "NICHILISMO", taboo: ["Nulla", "Senso", "Esistenza", "Nietzsche", "Vuoto"], level: 5, points: 5 },
  { id: 101, word: "DETERMINISMO", taboo: ["Destino", "Libero", "Arbitrio", "Causale", "Predefinito"], level: 5, points: 5 },
  { id: 102, word: "OLISMO", taboo: ["Tutto", "Insieme", "Parti", "Sistema", "Totalità"], level: 5, points: 5 },
  { id: 103, word: "ANACRONISMO", taboo: ["Tempo", "Fuori", "Posto", "Epoca", "Errore"], level: 5, points: 5 },
  { id: 104, word: "EPICUREISMO", taboo: ["Piacere", "Filosofia", "Epicuro", "Felicità", "Gioia"], level: 5, points: 5 },
  { id: 105, word: "SUBLIMAZIONE", taboo: ["Freud", "Energia", "Trasformare", "Impulso", "Arte"], level: 5, points: 5 },
  { id: 106, word: "PROIEZIONE", taboo: ["Psicologia", "Attribuire", "Altri", "Difesa", "Sentimenti"], level: 5, points: 5 },
  { id: 107, word: "RAZIONALIZZAZIONE", taboo: ["Giustificare", "Scusa", "Spiegare", "Difesa", "Logica"], level: 5, points: 5 },
  { id: 108, word: "RIMOZIONE", taboo: ["Dimenticare", "Memoria", "Inconscio", "Cancellare", "Ricordo"], level: 5, points: 5 },
  { id: 109, word: "TRANSFERT", taboo: ["Psicologia", "Spostare", "Emozioni", "Terapeuta", "Freud"], level: 5, points: 5 },
  { id: 110, word: "SUBLIMALE", taboo: ["Inconscio", "Nascosto", "Percezione", "Messaggi", "Sotto"], level: 5, points: 5 },
  { id: 111, word: "ARCHETIPO", taboo: ["Jung", "Simbolo", "Universale", "Inconscio", "Modello"], level: 5, points: 5 },
  { id: 112, word: "SINCRONICITÀ", taboo: ["Jung", "Coincidenza", "Significato", "Caso", "Connessione"], level: 5, points: 5 },
  { id: 113, word: "AMBIVALENZA", taboo: ["Contraddizione", "Sentimenti", "Opposti", "Insieme", "Confusione"], level: 5, points: 5 },
  { id: 114, word: "DISSONANZA", taboo: ["Contrasto", "Conflitto", "Credenze", "Psicologia", "Disagio"], level: 5, points: 5 },
  { id: 115, word: "EUFEMISMO", taboo: ["Parola", "Addolcire", "Sostituire", "Linguaggio", "Gentile"], level: 5, points: 5 },
  { id: 116, word: "OSSIMORO", taboo: ["Contraddizione", "Parole", "Opposte", "Figura", "Retorica"], level: 5, points: 5 },
  { id: 117, word: "PLEONASMO", taboo: ["Ripetizione", "Inutile", "Ridondante", "Linguaggio", "Superfluo"], level: 5, points: 5 },
  { id: 118, word: "ANTITESI", taboo: ["Opposto", "Contrario", "Contrasto", "Dialettica", "Tesi"], level: 5, points: 5 },
  { id: 119, word: "PARADOSSO", taboo: ["Contraddizione", "Logica", "Impossibile", "Assurdo", "Strano"], level: 5, points: 5 },
  { id: 120, word: "SOFISMA", taboo: ["Ragionamento", "Falso", "Inganno", "Logica", "Errore"], level: 5, points: 5 },

  // LEVEL 6: 25 cards (6 tabù, 6 punti)
  { id: 106, word: "EPISTEMOLOGIA", taboo: ["Conoscenza", "Sapere", "Verità", "Filosofia", "Scienza", "Studio"], level: 6, points: 6 },
  { id: 107, word: "FENOMENOLOGIA", taboo: ["Esperienza", "Coscienza", "Apparenza", "Husserl", "Fenomeno", "Filosofia"], level: 6, points: 6 },
  { id: 108, word: "DIALETTICA", taboo: ["Tesi", "Antitesi", "Sintesi", "Hegel", "Opposizione", "Contraddizione"], level: 6, points: 6 },
  { id: 109, word: "TRASCENDENZA", taboo: ["Oltre", "Superare", "Dio", "Limite", "Metafisica", "Spirituale"], level: 6, points: 6 },
  { id: 110, word: "SOLIPSISMO", taboo: ["Io", "Solo", "Esistere", "Mente", "Altri", "Realtà"], level: 6, points: 6 },
  { id: 111, word: "ERMENEUTICA", taboo: ["Interpretazione", "Testo", "Significato", "Comprendere", "Filosofia", "Senso"], level: 6, points: 6 },
  { id: 112, word: "ONTOLOGIA", taboo: ["Essere", "Esistenza", "Essenza", "Realtà", "Metafisica", "Filosofia"], level: 6, points: 6 },
  { id: 113, word: "APORIA", taboo: ["Contraddizione", "Paradosso", "Dubbio", "Problema", "Irrisolvibile", "Logica"], level: 6, points: 6 },
  { id: 114, word: "MAIEUTICA", taboo: ["Socrate", "Domande", "Conoscenza", "Parto", "Dialogo", "Verità"], level: 6, points: 6 },
  { id: 115, word: "EMPIRISMO", taboo: ["Esperienza", "Sensi", "Conoscenza", "Filosofia", "Osservazione", "Pratica"], level: 6, points: 6 },
  { id: 116, word: "RAZIONALISMO", taboo: ["Ragione", "Pensiero", "Logica", "Cartesio", "Mente", "Deduzione"], level: 6, points: 6 },
  { id: 117, word: "CONTINGENZA", taboo: ["Caso", "Necessario", "Possibile", "Accidentale", "Dipendere", "Eventuale"], level: 6, points: 6 },
  { id: 118, word: "IMMANENZA", taboo: ["Dentro", "Interno", "Mondo", "Trascendenza", "Presente", "Intrinseco"], level: 6, points: 6 },
  { id: 119, word: "TELEOLOGIA", taboo: ["Fine", "Scopo", "Causa", "Finalità", "Aristotele", "Obiettivo"], level: 6, points: 6 },
  { id: 120, word: "DUALISMO", taboo: ["Due", "Corpo", "Mente", "Cartesio", "Separazione", "Opposti"], level: 6, points: 6 },
  { id: 121, word: "MONISMO", taboo: ["Uno", "Tutto", "Unità", "Sostanza", "Unico", "Dualismo"], level: 6, points: 6 },
  { id: 122, word: "IDEALISMO", taboo: ["Idee", "Mente", "Realtà", "Filosofia", "Pensiero", "Platonico"], level: 6, points: 6 },
  { id: 123, word: "MATERIALISMO", taboo: ["Materia", "Fisico", "Concreto", "Filosofia", "Corpo", "Idealismo"], level: 6, points: 6 },
  { id: 124, word: "FENOMENOLOGIA", taboo: ["Husserl", "Esperienza", "Coscienza", "Apparenza", "Filosofia", "Fenomeno"], level: 6, points: 6 },
  { id: 125, word: "ESISTENZIALISMO", taboo: ["Sartre", "Esistenza", "Essenza", "Libertà", "Scelta", "Filosofia"], level: 6, points: 6 },
  { id: 126, word: "STOICISMO", taboo: ["Antica", "Calma", "Accettare", "Destino", "Filosofia", "Emozioni"], level: 6, points: 6 },
  { id: 127, word: "SCETTICISMO", taboo: ["Dubbio", "Non", "Credere", "Verità", "Conoscenza", "Filosofia"], level: 6, points: 6 },
  { id: 128, word: "DOGMATISMO", taboo: ["Certezza", "Assoluto", "Non", "Dubitare", "Rigido", "Convinzione"], level: 6, points: 6 },
  { id: 129, word: "RELATIVISMO", taboo: ["Relativo", "Assoluto", "Dipendere", "Contesto", "Verità", "Soggettivo"], level: 6, points: 6 },
  { id: 130, word: "ASSOLUTISMO", taboo: ["Assoluto", "Totale", "Completo", "Potere", "Relativo", "Universale"], level: 6, points: 6 },
];

const LEVEL_COLORS = {
  1: { bg: 'from-emerald-400 to-teal-500', text: 'text-emerald-600', border: 'border-emerald-500' },
  2: { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', border: 'border-green-500' },
  3: { bg: 'from-yellow-400 to-amber-500', text: 'text-yellow-600', border: 'border-yellow-500' },
  4: { bg: 'from-orange-400 to-orange-600', text: 'text-orange-600', border: 'border-orange-500' },
  5: { bg: 'from-red-500 to-rose-600', text: 'text-red-600', border: 'border-red-500' },
  6: { bg: 'from-purple-600 to-pink-600', text: 'text-purple-600', border: 'border-purple-500' }
};

// Level progression:
// Level 1: 4 taboo words (easy objects)
// Level 2: 4 taboo words (common concepts)
// Level 3: 4 taboo words (abstract concepts)
// Level 4: 5 taboo words (specialized terms)
// Level 5: 5 taboo words (complex concepts)
// Level 6: 6 taboo words (philosophical terms)

export default function ParolaVietataGame() {
  const [screen, setScreen] = useState('home');
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [settings, setSettings] = useState({ turnTime: 60, maxPasses: 5 });
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [passesLeft, setPassesLeft] = useState(5);
  const [guessedCards, setGuessedCards] = useState([]);
  const [turnScore, setTurnScore] = useState(0);
  const [newPlayerName, setNewPlayerName] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying && !isPaused && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endTurn();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isPlaying, isPaused]);

  const shuffleDeck = () => {
    const shuffled = [...CARDS_DATABASE].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    return shuffled;
  };

  const startGame = () => {
    if (players.length < 2) {
      alert('Servono almeno 2 squadre!');
      return;
    }
    const shuffled = shuffleDeck();
    setCurrentCard(shuffled[0]);
    setDeck(shuffled.slice(1));
    setTimeLeft(settings.turnTime);
    setPassesLeft(settings.maxPasses);
    setGuessedCards([]);
    setTurnScore(0);
    setCurrentPlayerIndex(0);
    setScreen('game');
  };

  const startTurn = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleGuessed = () => {
    if (!currentCard) return;
    
    setGuessedCards([...guessedCards, currentCard]);
    setTurnScore(turnScore + currentCard.points);
    
    if (deck.length > 0) {
      setCurrentCard(deck[0]);
      setDeck(deck.slice(1));
    } else {
      endTurn();
    }
  };

  const handlePass = () => {
    if (passesLeft > 0 && currentCard) {
      setPassesLeft(passesLeft - 1);
      setDeck([...deck, currentCard]);
      if (deck.length > 0) {
        setCurrentCard(deck[0]);
        setDeck(deck.slice(1));
      }
    }
  };

  const endTurn = () => {
    setIsPlaying(false);
    setIsPaused(false);
    
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].score += turnScore;
    setPlayers(updatedPlayers);
    
    setScreen('endTurn');
  };

  const nextTurn = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    
    // End game when deck is almost empty (less than 5 cards)
    if (deck.length < 5) {
      setScreen('final');
      return;
    }
    
    setCurrentPlayerIndex(nextIndex);
    setTimeLeft(settings.turnTime);
    setPassesLeft(settings.maxPasses);
    setGuessedCards([]);
    setTurnScore(0);
    
    if (deck.length > 0) {
      setCurrentCard(deck[0]);
      setDeck(deck.slice(1));
    }
    
    setScreen('game');
  };

  const resetGame = () => {
    setScreen('home');
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDeck([]);
    setCurrentCard(null);
    setTimeLeft(60);
    setIsPlaying(false);
    setPassesLeft(5);
    setGuessedCards([]);
    setTurnScore(0);
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { name: newPlayerName.trim(), score: 0 }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Righteous&display=swap');
        `}</style>
        <div className="text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <Zap className="w-24 h-24 mx-auto text-yellow-300 drop-shadow-2xl" strokeWidth={3} />
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 tracking-tight transform -rotate-2 drop-shadow-2xl leading-tight" style={{ fontFamily: "'Bangers', cursive" }}>
            PAROLA VIETATA
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 sm:mb-12 font-bold tracking-wide px-4" style={{ fontFamily: "'Righteous', cursive" }}>
            60 secondi. Parole vietate. Indovina tutto.
          </p>
          <button
            onClick={() => setScreen('setup')}
            className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-2xl sm:text-3xl font-black rounded-2xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 active:scale-95"
            style={{ fontFamily: "'Righteous', cursive" }}
          >
            <Play className="inline-block mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10 group-hover:animate-pulse" />
            INIZIA A GIOCARE
          </button>
          <div className="mt-16 text-white/70 text-sm max-w-md mx-auto leading-relaxed">
            <p className="mb-2">🎯 Fai indovinare le parole evitando i tabù</p>
            <p className="mb-2">👥 Gioca a squadre contro i tuoi amici</p>
            <p>🏆 La squadra con più punti vince!</p>
          </div>
        </div>
      </div>
    );
  }

  // SETUP SCREEN
  if (screen === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
        `}</style>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setScreen('home')}
            className="mb-6 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
          >
            ← Indietro
          </button>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-white/20">
            <h2 className="text-5xl font-black text-white mb-8 text-center" style={{ fontFamily: "'Righteous', cursive" }}>
              CONFIGURAZIONE
            </h2>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center">
                <Users className="mr-2" /> Squadre
              </h3>
              <div className="space-y-3 mb-4">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/20 rounded-xl p-4">
                    <span className="text-xl font-bold text-white">{player.name}</span>
                    <button
                      onClick={() => removePlayer(index)}
                      className="text-red-300 hover:text-red-500 font-bold text-2xl"
                    >
                      <X size={24} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  placeholder="Nome squadra..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:border-yellow-300 outline-none text-lg"
                />
                <button
                  onClick={addPlayer}
                  className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-300 transition"
                >
                  Aggiungi
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center">
                <Timer className="mr-2" /> Impostazioni
              </h3>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <label className="text-white font-bold mb-2 block">Tempo per turno</label>
                  <select
                    value={settings.turnTime}
                    onChange={(e) => setSettings({ ...settings, turnTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-purple-900 text-white border-2 border-white/30 outline-none font-semibold cursor-pointer"
                    style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    <option value={30} className="bg-purple-900 text-white">30 secondi</option>
                    <option value={45} className="bg-purple-900 text-white">45 secondi</option>
                    <option value={60} className="bg-purple-900 text-white">60 secondi (classico)</option>
                    <option value={90} className="bg-purple-900 text-white">90 secondi</option>
                  </select>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <label className="text-white font-bold mb-2 block">Pass massimi per turno</label>
                  <select
                    value={settings.maxPasses}
                    onChange={(e) => setSettings({ ...settings, maxPasses: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-purple-900 text-white border-2 border-white/30 outline-none font-semibold cursor-pointer"
                    style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    <option value={3} className="bg-purple-900 text-white">3 pass</option>
                    <option value={5} className="bg-purple-900 text-white">5 pass (consigliato)</option>
                    <option value={7} className="bg-purple-900 text-white">7 pass</option>
                    <option value={999} className="bg-purple-900 text-white">Pass illimitati</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="w-full py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-3xl font-black rounded-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              style={{ fontFamily: "'Righteous', cursive" }}
            >
              🚀 INIZIA PARTITA
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GAME SCREEN
  if (screen === 'game') {
    const currentPlayer = players[currentPlayerIndex];
    const levelColor = LEVEL_COLORS[currentCard?.level || 1];
    const timePercentage = (timeLeft / settings.turnTime) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Righteous&display=swap');
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          .no-select {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        `}</style>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-white/10 backdrop-blur px-2 py-2 rounded-xl text-center">
              <p className="text-yellow-300 text-xs font-bold">TURNO</p>
              <p className="text-white text-sm font-black truncate">{currentPlayer?.name}</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-2 py-2 rounded-xl text-center">
              <p className="text-yellow-300 text-xs font-bold">CARTE</p>
              <p className="text-white text-lg font-black">{deck.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-2 py-2 rounded-xl text-center">
              <p className="text-yellow-300 text-xs font-bold">PUNTI</p>
              <p className="text-white text-lg font-black">{currentPlayer?.score}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-white/20">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft > 20 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  timeLeft > 10 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse'
                }`}
                style={{ width: `${timePercentage}%` }}
              />
            </div>
            <p className={`text-center mt-1 text-4xl font-black ${
              timeLeft > 20 ? 'text-green-400' :
              timeLeft > 10 ? 'text-yellow-400' :
              'text-red-400 animate-pulse'
            }`} style={{ fontFamily: "'Righteous', cursive" }}>
              {timeLeft}s
            </p>
          </div>

          {currentCard && (
            <div className={`no-select relative bg-gradient-to-br ${levelColor.bg} rounded-2xl p-3 sm:p-6 md:p-8 shadow-2xl border-4 border-white mb-4 transform ${isPlaying ? 'scale-100' : 'scale-95'} transition-transform`}>
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full shadow-lg border-2 border-white">
                <p className="text-xs font-black text-gray-900">LV {currentCard.level}</p>
              </div>
              
              <div className="text-center mb-3 mt-6">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-2 leading-none px-2" style={{ fontFamily: "'Arial Black', 'Arial', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {currentCard.word}
                </h2>
                <div className="inline-block bg-white/30 backdrop-blur px-3 py-1 rounded-full mt-2">
                  <p className="text-sm sm:text-base font-black text-white">{currentCard.points} {currentCard.points === 1 ? 'PT' : 'PUNTI'}</p>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur rounded-xl p-3">
                <p className="text-yellow-300 text-base sm:text-xl font-black mb-2 text-center">🚫 VIETATE</p>
                <div className="grid grid-cols-2 gap-2">
                  {currentCard.taboo.map((word, idx) => (
                    <div key={idx} className="bg-red-500 rounded-lg p-2 text-center">
                      <p className="text-white text-sm sm:text-lg font-black break-words leading-tight">{word}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!isPlaying ? (
            <button
              onClick={startTurn}
              className="w-full py-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xl sm:text-3xl font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
              style={{ fontFamily: "'Righteous', cursive" }}
            >
              ▶️ INIZIA TURNO
            </button>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleGuessed}
                  className="py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-lg sm:text-2xl font-black rounded-xl hover:scale-105 transition-all shadow-xl active:scale-95 touch-manipulation"
                  style={{ fontFamily: "'Righteous', cursive" }}
                >
                  <CheckCircle className="inline mr-1 w-6 h-6" />
                  OK!
                </button>
                <button
                  onClick={handlePass}
                  disabled={passesLeft === 0}
                  className="py-6 bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg sm:text-2xl font-black rounded-xl hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 touch-manipulation"
                  style={{ fontFamily: "'Righteous', cursive" }}
                >
                  <SkipForward className="inline mr-1 w-6 h-6" />
                  PASS ({passesLeft})
                </button>
              </div>
              <button
                onClick={togglePause}
                className="w-full py-4 bg-white/20 backdrop-blur text-white text-base sm:text-xl font-bold rounded-xl hover:bg-white/30 transition touch-manipulation"
              >
                <Pause className="inline mr-2 w-5 h-5" />
                {isPaused ? 'RIPRENDI' : 'PAUSA'}
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <div className="inline-block bg-white/10 backdrop-blur px-8 py-4 rounded-2xl">
              <p className="text-yellow-300 text-sm font-bold mb-1">PUNTI QUESTO TURNO</p>
              <p className="text-white text-5xl font-black">{turnScore}</p>
              <p className="text-white/70 text-sm mt-1">{guessedCards.length} carte indovinate</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // END TURN SCREEN
  if (screen === 'endTurn') {
    const currentPlayer = players[currentPlayerIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
        `}</style>
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-white/20 text-center">
            <div className="mb-8">
              <Zap className="w-24 h-24 mx-auto text-yellow-300 animate-bounce" />
            </div>
            
            <h2 className="text-6xl font-black text-white mb-4" style={{ fontFamily: "'Righteous', cursive" }}>
              TEMPO SCADUTO!
            </h2>
            
            <p className="text-3xl text-yellow-300 font-bold mb-8">
              {currentPlayer?.name} ha fatto {turnScore} {turnScore === 1 ? 'punto' : 'punti'}!
            </p>

            <div className="bg-black/30 rounded-2xl p-6 mb-8">
              <p className="text-white/70 text-lg mb-4">Carte indovinate: {guessedCards.length}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {guessedCards.map((card, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${LEVEL_COLORS[card.level].bg} rounded-lg p-3`}>
                    <p className="text-white font-bold text-sm">{card.word}</p>
                    <p className="text-white/70 text-xs">+{card.points}pt</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/30 rounded-2xl p-6 mb-8">
              <p className="text-yellow-300 font-bold text-xl mb-4">🏆 CLASSIFICA</p>
              <div className="space-y-2">
                {[...players].sort((a, b) => b.score - a.score).map((player, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span className="text-white font-bold">
                      {idx + 1}. {player.name}
                    </span>
                    <span className="text-yellow-300 font-black text-xl">{player.score} pt</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextTurn}
              className="w-full py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-3xl font-black rounded-2xl hover:scale-105 transition-all shadow-2xl"
              style={{ fontFamily: "'Righteous', cursive" }}
            >
              PROSSIMO TURNO →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FINAL SCREEN
  if (screen === 'final') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Righteous&display=swap');
        `}</style>
        <div className="max-w-3xl w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-white/20 text-center">
            <Trophy className="w-32 h-32 mx-auto text-yellow-300 mb-6 animate-bounce" />
            
            <h2 className="text-7xl md:text-9xl font-black text-white mb-4 drop-shadow-2xl" style={{ fontFamily: "'Bangers', cursive" }}>
              VITTORIA!
            </h2>
            
            <p className="text-4xl md:text-5xl text-yellow-300 font-black mb-12" style={{ fontFamily: "'Righteous', cursive" }}>
              🎉 {winner?.name} 🎉
            </p>

            <div className="bg-black/30 rounded-2xl p-8 mb-8">
              <p className="text-yellow-300 font-bold text-2xl mb-6">CLASSIFICA FINALE</p>
              <div className="space-y-3">
                {sortedPlayers.map((player, idx) => (
                  <div key={idx} className={`flex justify-between items-center rounded-xl p-4 ${
                    idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                    idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                    idx === 2 ? 'bg-gradient-to-r from-orange-400 to-yellow-600' :
                    'bg-white/10'
                  }`}>
                    <span className={`font-black text-2xl ${idx < 3 ? 'text-gray-900' : 'text-white'}`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`} {player.name}
                    </span>
                    <span className={`font-black text-3xl ${idx < 3 ? 'text-gray-900' : 'text-yellow-300'}`}>
                      {player.score} pt
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={resetGame}
                className="py-6 bg-white/20 backdrop-blur text-white text-xl font-black rounded-2xl hover:bg-white/30 transition"
                style={{ fontFamily: "'Righteous', cursive" }}
              >
                <RotateCcw className="inline mr-2" />
                NUOVA PARTITA
              </button>
              <button
                onClick={() => setScreen('setup')}
                className="py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-black rounded-2xl hover:scale-105 transition"
                style={{ fontFamily: "'Righteous', cursive" }}
              >
                RIVINCITA
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
