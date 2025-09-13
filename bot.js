const { Telegraf } = require('telegraf');
const bot = new Telegraf("8353819114:AAF09ELwy_MbfzBaPS_grV5EOhvlQsyqndQ");

const jobNotes = {}; // temporary in-memory storage

bot.on('callback_query', async (ctx) => {
  const action = ctx.callbackQuery.data;
  const user = ctx.callbackQuery.from.first_name;
  const msg = ctx.callbackQuery.message.text;

  if(action==='accept'){ await ctx.answerCbQuery('Booking accepted ✅'); await ctx.editMessageText(msg+`\n\n✅ Accepted by ${user}`,{parse_mode:'Markdown'});}
  else if(action==='reject'){ await ctx.answerCbQuery('Booking rejected ❌'); await ctx.editMessageText(msg+`\n\n❌ Rejected by ${user}`,{parse_mode:'Markdown'});}
  else if(action==='accept_callback'){ await ctx.answerCbQuery('Callback accepted ✅'); await ctx.editMessageText(msg+`\n\n✅ Callback accepted by ${user}`,{parse_mode:'Markdown'});}
  else if(action==='reject_callback'){ await ctx.answerCbQuery('Callback rejected ❌'); await ctx.editMessageText(msg+`\n\n❌ Callback rejected by ${user}`,{parse_mode:'Markdown'});}
  else if(action==='in_progress'){ await ctx.answerCbQuery('Job marked In Progress 🔧'); await ctx.editMessageText(msg+`\n\n🔧 In Progress by ${user}`,{parse_mode:'Markdown'});}
  else if(action==='completed'){ await ctx.answerCbQuery('Job marked Completed ✅'); await ctx.editMessageText(msg+`\n\n✅ Completed by ${user}`,{parse_mode:'Markdown'});}
  else if(action.startsWith('add_note_')){
    const jobId = action.split('add_note_')[1];
    await ctx.answerCbQuery('Send your note in the chat');

    bot.on('text', async (noteCtx)=>{
      const note = noteCtx.message.text;
      if(!jobNotes[jobId]) jobNotes[jobId]=[];
      jobNotes[jobId].push({user,note,time:new Date().toLocaleString()});
      await noteCtx.reply(`📝 Note added to Job ${jobId}:\n"${note}"`);
    });
  }
});

bot.launch();
console.log('SOS Mechanics bot running with full job management...');