import { db } from '../config/db';

class Pad{
    
    find(path: string | string[] | undefined){
      if(path == undefined){
        return {};  
      }
      const currentPad = db.data.pads.find((el) => el.path === path);
      if(!!currentPad){
        return {path: currentPad.path, content: currentPad.content};
      }
      return {};
    }

    save(pad: { path: string; content: string; }){
      const currentPad = db.data.pads.find((el) => el.path === pad.path);
      if(currentPad){
        currentPad.content = pad.content;
      }else{
        db.data.pads.push({path: pad.path, content: pad.content});
      }
      db.write();
      return currentPad;
    }
}

export default Pad;