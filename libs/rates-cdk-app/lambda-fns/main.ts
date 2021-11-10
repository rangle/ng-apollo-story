import deleteNote from './deleteNote';
import listNotes from './listNotes';
import updateNote from './updateNote';
import Note from './Note';
import getCryptoByTicker from './getCryptoByTicker';
import getTickers from './getTickers';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    noteId: string;
    note: Note;
    ticker: string;
    granularity: 'DAY' | 'HOUR' | 'TEN_MINUTE';
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case 'listNotes':
      return await listNotes();
    case 'deleteNote':
      return await deleteNote(event.arguments.noteId);
    case 'updateNote':
      return await updateNote(event.arguments.note);
    case 'getCryptoByTicker':
      return await getCryptoByTicker(
        event.arguments.ticker,
        event.arguments.granularity
      );
    case 'getTickers':
      return await getTickers();
    default:
      return null;
  }
};
