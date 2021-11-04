import deleteNote from './deleteNote';
import getNoteById from './getNoteById';
import listNotes from './listNotes';
import updateNote from './updateNote';
import Note from './Note';
import getCryptoByTicker from './getCryptoByTicker';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    noteId: string;
    note: Note;
    ticker: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case 'getNoteById':
      return await getNoteById(event.arguments.noteId);
    case 'listNotes':
      return await listNotes();
    case 'deleteNote':
      return await deleteNote(event.arguments.noteId);
    case 'updateNote':
      return await updateNote(event.arguments.note);
    case 'getCryptoByTicker':
      return await getCryptoByTicker(event.arguments.ticker);
    default:
      return null;
  }
};
