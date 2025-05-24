import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Button, CircularProgress, Container, List, ListItem, ListItemAvatar, ListItemText,
  Paper, TextField, Typography, Avatar, IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Chip, Tooltip, Switch, Snackbar, Menu, MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LanguageIcon from '@mui/icons-material/Language';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import robotAnimation from '../assets/rebot.json'; 
import { ChatMessage } from '../services/chatbot/type';
import { fetchChatHistory } from '../services/chatbot/getChatHistory';
import { sendChatMessage } from '../services/chatbot/getChatResponse';
import { deleteConversation } from '../services/chatbot/deleteConversation.';

const UserAvatar = () => <Avatar alt="User" src="user.avif" sx={{ bgcolor: 'grey.700' }} />;
const BotAvatar = () => <Avatar alt="Bot" src="chatbot-conversation.avif" sx={{ bgcolor: 'primary.main' }} />;

type Language = 'fr' | 'en' | 'es' | 'de' | 'ar' | 'it' | 'vi';

interface Translations {
  [key: string]: {
    welcome: string;
    subtitle: string;
    chatbotTitle: string;
    voiceTooltipOn: string;
    voiceTooltipOff: string;
    darkMode: string;
    deleteConversation: string;
    confirmDeleteTitle: string;
    confirmDeleteText: string;
    cancel: string;
    delete: string;
    send: string;
    placeholder: string;
    copied: string;
    copyFailed: string;
    botLabel: string;
    userLabel: string;
    autoLabel: string;
    userTypeLabel: string;
    loadingHistory: string;
    unexpectedError: string;
    deleteError: string;
    language: string;
  };
}

const translations: Translations = {
  fr: {
    welcome: "Bienvenue dans votre assistant intelligent",
    subtitle: "Posez vos questions librement, je suis là pour vous aider.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Désactiver la voix",
    voiceTooltipOff: "Activer la voix",
    darkMode: "Mode Sombre",
    deleteConversation: "Supprimer la conversation",
    confirmDeleteTitle: "Confirmer la suppression",
    confirmDeleteText: "Voulez-vous vraiment supprimer toute la conversation ? Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    send: "Envoyer",
    placeholder: "Tapez votre message ici...",
    copied: "Message copié !",
    copyFailed: "Échec de la copie.",
    botLabel: "Bot 🤖",
    userLabel: "Vous 👤",
    autoLabel: "Automatique",
    userTypeLabel: "Utilisateur",
    loadingHistory: "Chargement de l'historique...",
    unexpectedError: "Erreur inattendue",
    deleteError: "Erreur lors de la suppression de la conversation.",
    language: "Français"
  },
  en: {
    welcome: "Welcome to your smart assistant",
    subtitle: "Ask your questions freely, I'm here to help you.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Disable voice",
    voiceTooltipOff: "Enable voice",
    darkMode: "Dark Mode",
    deleteConversation: "Delete conversation",
    confirmDeleteTitle: "Confirm deletion",
    confirmDeleteText: "Do you really want to delete the entire conversation? This action is irreversible.",
    cancel: "Cancel",
    delete: "Delete",
    send: "Send",
    placeholder: "Type your message here...",
    copied: "Message copied!",
    copyFailed: "Copy failed.",
    botLabel: "Bot 🤖",
    userLabel: "You 👤",
    autoLabel: "Automatic",
    userTypeLabel: "User",
    loadingHistory: "Loading history...",
    unexpectedError: "Unexpected error",
    deleteError: "Error while deleting conversation.",
    language: "English"
  },
  es: {
    welcome: "Bienvenido a tu asistente inteligente",
    subtitle: "Haz tus preguntas libremente, estoy aquí para ayudarte.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Desactivar voz",
    voiceTooltipOff: "Activar voz",
    darkMode: "Modo Oscuro",
    deleteConversation: "Eliminar conversación",
    confirmDeleteTitle: "Confirmar eliminación",
    confirmDeleteText: "¿Realmente quieres eliminar toda la conversación? Esta acción es irreversible.",
    cancel: "Cancelar",
    delete: "Eliminar",
    send: "Enviar",
    placeholder: "Escribe tu mensaje aquí...",
    copied: "¡Mensaje copiado!",
    copyFailed: "Error al copiar.",
    botLabel: "Bot 🤖",
    userLabel: "Tú 👤",
    autoLabel: "Automático",
    userTypeLabel: "Usuario",
    loadingHistory: "Cargando historial...",
    unexpectedError: "Error inesperado",
    deleteError: "Error al eliminar la conversación.",
    language: "Español"
  },
  de: {
    welcome: "Willkommen bei Ihrem intelligenten Assistenten",
    subtitle: "Stellen Sie Ihre Fragen frei, ich bin hier, um Ihnen zu helfen.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Stimme deaktivieren",
    voiceTooltipOff: "Stimme aktivieren",
    darkMode: "Dunkelmodus",
    deleteConversation: "Konversation löschen",
    confirmDeleteTitle: "Löschen bestätigen",
    confirmDeleteText: "Möchten Sie die gesamte Konversation wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    delete: "Löschen",
    send: "Senden",
    placeholder: "Geben Sie hier Ihre Nachricht ein...",
    copied: "Nachricht kopiert!",
    copyFailed: "Kopieren fehlgeschlagen.",
    botLabel: "Bot 🤖",
    userLabel: "Sie 👤",
    autoLabel: "Automatisch",
    userTypeLabel: "Benutzer",
    loadingHistory: "Verlauf wird geladen...",
    unexpectedError: "Unerwarteter Fehler",
    deleteError: "Fehler beim Löschen der Konversation.",
    language: "Deutsch"
  },
  it: {
    welcome: "Benvenuto nel tuo assistente intelligente",
    subtitle: "Fai le tue domande liberamente, sono qui per aiutarti.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Disattiva voce",
    voiceTooltipOff: "Attiva voce",
    darkMode: "Modalità Scura",
    deleteConversation: "Elimina conversazione",
    confirmDeleteTitle: "Conferma eliminazione",
    confirmDeleteText: "Vuoi davvero eliminare l'intera conversazione? Questa azione è irreversibile.",
    cancel: "Annulla",
    delete: "Elimina",
    send: "Invia",
    placeholder: "Scrivi il tuo messaggio qui...",
    copied: "Messaggio copiato!",
    copyFailed: "Copia fallita.",
    botLabel: "Bot 🤖",
    userLabel: "Tu 👤",
    autoLabel: "Automatico",
    userTypeLabel: "Utente",
    loadingHistory: "Caricamento cronologia...",
    unexpectedError: "Errore imprevisto",
    deleteError: "Errore durante l'eliminazione della conversazione.",
    language: "Italiano"
  },
  vi: {
    welcome: "Chào mừng đến với trợ lý thông minh của bạn",
    subtitle: "Hãy tự do đặt câu hỏi, tôi ở đây để giúp bạn.",
    chatbotTitle: "🤖 Chatbot",
    voiceTooltipOn: "Tắt giọng nói",
    voiceTooltipOff: "Bật giọng nói",
    darkMode: "Chế độ tối",
    deleteConversation: "Xóa cuộc trò chuyện",
    confirmDeleteTitle: "Xác nhận xóa",
    confirmDeleteText: "Bạn có thực sự muốn xóa toàn bộ cuộc trò chuyện? Hành động này không thể hoàn tác.",
    cancel: "Hủy",
    delete: "Xóa",
    send: "Gửi",
    placeholder: "Nhập tin nhắn của bạn ở đây...",
    copied: "Đã sao chép tin nhắn!",
    copyFailed: "Sao chép thất bại.",
    botLabel: "Bot 🤖",
    userLabel: "Bạn 👤",
    autoLabel: "Tự động",
    userTypeLabel: "Người dùng",
    loadingHistory: "Đang tải lịch sử...",
    unexpectedError: "Lỗi không mong muốn",
    deleteError: "Lỗi khi xóa cuộc trò chuyện.",
    language: "Tiếng Việt"
  },
  ar: {
    welcome: "مرحبًا بكم في مساعدكم الذكي",
    subtitle: "اطرحوا أسئلتكم بحرية، أنا هنا لمساعدتكم.",
    chatbotTitle: "🤖 شات بوت",
    voiceTooltipOn: "تعطيل الصوت",
    voiceTooltipOff: "تفعيل الصوت",
    darkMode: "الوضع المظلم",
    deleteConversation: "حذف المحادثة",
    confirmDeleteTitle: "تأكيد الحذف",
    confirmDeleteText: "هل تريد حقًا حذف المحادثة بأكملها؟ هذا الإجراء لا يمكن التراجع عنه.",
    cancel: "إلغاء",
    delete: "حذف",
    send: "إرسال",
    placeholder: "اكتب رسالتك هنا...",
    copied: "تم نسخ الرسالة!",
    copyFailed: "فشل النسخ.",
    botLabel: "بوت 🤖",
    userLabel: "أنت 👤",
    autoLabel: "تلقائي",
    userTypeLabel: "مستخدم",
    loadingHistory: "جاري تحميل السجل...",
    unexpectedError: "خطأ غير متوقع",
    deleteError: "حدث خطأ أثناء حذف المحادثة.",
    language: "العربية"
  }
};

const languageOptions: { code: Language; name: string; dir?: 'rtl' }[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Record<string, 'up' | 'down'>>({});
  const [darkMode, setDarkMode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const userId = '6828845cfef98af005645ef2';

  const t = translations[language];
  const currentLanguage = languageOptions.find(lang => lang.code === language);

  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis || null;
    
    return () => {
      if (speechSynthesisRef.current?.speaking) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory(userId);
        setMessages(history);
      } catch (error) {
        console.error(t.loadingHistory, error);
      }
    };
    loadHistory();
  }, [userId, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [messages]);

  const speak = (text: string) => {
    if (!voiceEnabled || !speechSynthesisRef.current) return;

    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLangCode(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    speechUtteranceRef.current = utterance;
    speechSynthesisRef.current.speak(utterance);
  };

  const getSpeechLangCode = (lang: Language): string => {
    const codes: Record<Language, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT',
      vi: 'vi-VN',
      ar: 'ar-SA'
    };
    return codes[lang] || 'en-US';
  };

  const toggleVoice = () => {
    const newVoiceEnabled = !voiceEnabled;
    setVoiceEnabled(newVoiceEnabled);
    
    if (!newVoiceEnabled && speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setSpeaking(false);
    }
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    handleLanguageMenuClose();
    
    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory(userId);
        setMessages(history);
      } catch (error) {
        console.error(translations[lang].loadingHistory, error);
      }
    };
    loadHistory();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      message: input,
      created_at: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const typingMsg: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'chatbot',
        message: '...',
        created_at: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, typingMsg]);

      const botResponse = await sendChatMessage(input, userId);
      const botMsg: ChatMessage = {
        id: typingMsg.id,
        sender: 'chatbot',
        message: botResponse,
        created_at: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev.slice(0, -1), botMsg]);

      if (voiceEnabled) {
        speak(botResponse);
      }
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'chatbot',
        message: error.message || t.unexpectedError,
        created_at: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev.slice(0, -1), errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await deleteConversation(userId);
      setMessages([]);
      setFeedbacks({});
      setOpenConfirm(false);
    } catch {
      alert(t.deleteError);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbacks(prev => {
      if (prev[id] === type) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: type };
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(t.copied);
    } catch {
      setCopiedMessage(t.copyFailed);
    }
  };

  const HeaderWithAnimation = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 4,
        mb: 6,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: 180, minWidth: 140 }}
      >
        <Lottie animationData={robotAnimation} loop={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', maxWidth: 520 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(to right, #1976d2, #ec407a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            mb: 1,
            userSelect: 'none',
          }}
        >
          {t.welcome}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {t.subtitle}
        </Typography>
      </motion.div>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5, direction: currentLanguage?.dir }}>
      {HeaderWithAnimation()}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 3,
            borderRadius: 4,
            background: darkMode
              ? 'linear-gradient(135deg, #1f1f1f, #2c2c2c)'
              : 'linear-gradient(135deg, #e3f2fd, #fce4ec)',
            color: darkMode ? '#f5f5f5' : '#212121',
            transition: 'all 0.4s ease',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Typography variant="h4" fontWeight="bold">{t.chatbotTitle}</Typography>
            </motion.div>
            <Box display="flex" alignItems="center" gap={1}>
              <Box>
                <Tooltip title={t.language}>
                  <IconButton
                    onClick={handleLanguageMenuOpen}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <LanguageIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleLanguageMenuClose}
                >
                  {languageOptions.map((option) => (
                    <MenuItem
                      key={option.code}
                      selected={language === option.code}
                      onClick={() => changeLanguage(option.code)}
                      sx={{ direction: option.dir }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              
              <Tooltip title={voiceEnabled ? t.voiceTooltipOn : t.voiceTooltipOff}>
                <motion.div
                  animate={speaking ? { scale: [1, 1.1, 1] } : {}}
                  transition={speaking ? { repeat: Infinity, duration: 0.8 } : {}}
                >
                  <IconButton
                    onClick={toggleVoice}
                    color={voiceEnabled ? 'primary' : 'default'}
                    sx={{ mr: 1 }}
                  >
                    {voiceEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                </motion.div>
              </Tooltip>
              
              <Typography variant="body2">{t.darkMode}</Typography>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <Button
                onClick={() => setOpenConfirm(true)}
                startIcon={<DeleteIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #f44336, #d32f2f)',
                  color: 'white',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {t.deleteConversation}
              </Button>
            </Box>
          </Box>

          <Paper
            elevation={3}
            sx={{
              height: '60vh',
              overflowY: 'auto',
              p: 2,
              mb: 2,
              background: darkMode ? '#2a2a2a' : '#ffffffc0',
              borderRadius: 3,
              backdropFilter: 'blur(4px)',
              transition: 'background 0.3s',
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box display="flex" justifyContent={msg.sender === 'chatbot' ? 'flex-start' : 'flex-end'}>
                    <ListItem
                      sx={{
                        maxWidth: '75%',
                        bgcolor: msg.sender === 'chatbot'
                          ? darkMode ? '#37474f' : '#e3f2fd'
                          : darkMode ? '#5c4d7d' : '#ede7f6',
                        borderRadius: 2,
                        mb: 1,
                        px: 2,
                        py: 1,
                        color: darkMode ? '#f5f5f5' : '#212121',
                        alignItems: 'flex-start',
                      }}
                    >
                      <ListItemAvatar>
                        {msg.sender === 'chatbot' ? <BotAvatar /> : <UserAvatar />}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                            <Typography fontWeight="bold">
                              {msg.sender === 'chatbot' ? t.botLabel : t.userLabel}
                            </Typography>
                            <Chip size="small" label={msg.sender === 'chatbot' ? t.autoLabel : t.userTypeLabel} />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                              {msg.message}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                              <AccessTimeIcon fontSize="small" />
                              <Typography variant="caption" color="text.secondary">
                                {msg.created_at}
                              </Typography>
                              <Tooltip title={language === 'fr' ? "Copier" : 
                                              language === 'es' ? "Copiar" : 
                                              language === 'de' ? "Kopieren" :
                                              language === 'it' ? "Copia" :
                                              language === 'vi' ? "Sao chép" :
                                              language === 'ar' ? "نسخ" : "Copy"}>
                                <IconButton size="small" onClick={() => handleCopy(msg.message)}>
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            {msg.sender === 'chatbot' && msg.id && (
                              <Box mt={1} display="flex" gap={1}>
                                <Tooltip title={language === 'fr' ? "J'aime" : 
                                                language === 'es' ? "Me gusta" : 
                                                language === 'de' ? "Gefällt mir" :
                                                language === 'it' ? "Mi piace" :
                                                language === 'vi' ? "Thích" :
                                                language === 'ar' ? "إعجاب" : "Like"}>
                                  <IconButton
                                    size="small"
                                    color={feedbacks[msg.id] === 'up' ? 'success' : 'default'}
                                    onClick={() => handleFeedback(msg.id!, 'up')}
                                  >
                                    <ThumbUpAltIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title={language === 'fr' ? "Je n'aime pas" : 
                                                language === 'es' ? "No me gusta" : 
                                                language === 'de' ? "Gefällt mir nicht" :
                                                language === 'it' ? "Non mi piace" :
                                                language === 'vi' ? "Không thích" :
                                                language === 'ar' ? "عدم إعجاب" : "Dislike"}>
                                  <IconButton
                                    size="small"
                                    color={feedbacks[msg.id] === 'down' ? 'error' : 'default'}
                                    onClick={() => handleFeedback(msg.id!, 'down')}
                                  >
                                    <ThumbDownAltIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  </Box>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>

          <Box display="flex" gap={1}>
            <TextField
              multiline
              minRows={1}
              maxRows={5}
              variant="outlined"
              placeholder={t.placeholder}
              fullWidth
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              sx={{ bgcolor: darkMode ? '#424242' : 'white', borderRadius: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{
                px: 4,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t.send}
            </Button>
          </Box>

          <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>{t.confirmDeleteTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t.confirmDeleteText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirm(false)}>{t.cancel}</Button>
              <Button
                onClick={handleDeleteConversation}
                color="error"
                variant="contained"
              >
                {t.delete}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={copiedMessage !== null}
            autoHideDuration={2000}
            onClose={() => setCopiedMessage(null)}
            message={copiedMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Chatbot;




// Il est complet et opérationnel, avec :

// Dark mode

// Historique

// Feedback (like/dislike)

// Animation Lottie

// Suppression de conversation

// Snackbar de confirmation de copie

// Scroll auto à la fin



















