/*
   1) CONSTANTES E CONFIGURAÇÕES
*/

// Chave usada no localStorage para persistir os dados da aplicação
const STORAGE_KEY = 'routineAppData_v2_multilang';

// Dados padrão usados na primeira execução (apenas exemplo/teste)
const DEFAULT_DATA = {
  // Rotinas iniciais de exemplo (ajuste como quiser)
  routines: [
    {
      id: 't1',
      title: 'Treino de força (peito e tríceps)',
      description: 'Foco em progressão de carga.',
      date: new Date().toISOString().split('T')[0], // data de hoje no formato YYYY-MM-DD
      time: '08:00',
      priority: 'high',
      tag: 'saúde',
      completed: false,
      status: 'doing'
    },
    {
      id: 't2',
      title: 'Reunião de planejamento semanal',
      description: 'Revisar metas e definir prioridades.',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      priority: 'medium',
      tag: 'trabalho',
      completed: false,
      status: 'todo'
    },
    {
      id: 't3',
      title: 'Ler 50 páginas do livro "Atomic Habits"',
      description: 'Hábito de leitura diário.',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // amanhã
      time: undefined,
      priority: 'low',
      tag: 'estudos',
      completed: false,
      status: 'todo'
    },
    {
      id: 't4',
      title: 'Pagar contas mensais',
      description: 'Água, luz, internet.',
      date: new Date().toISOString().split('T')[0],
      time: undefined,
      priority: 'high',
      tag: 'pessoal',
      completed: true,
      status: 'done'
    }
  ],
  // Etiquetas iniciais
  tags: [
    { id: 'tag1', name: 'pessoal', color: '#4f46e5' },
    { id: 'tag2', name: 'trabalho', color: '#10b981' },
    { id: 'tag3', name: 'saúde', color: '#ef4444' },
    { id: 'tag4', name: 'estudos', color: '#f59e0b' }
  ],
  // Preferências iniciais
  preferences: {
    theme: 'light',
    showCompleted: true,
    notifications: false,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16'
  },
  // Perfil do usuário
  profile: {
    displayName: 'Carlos',
    userName: 'onror',
    email: 'exemplo@gmail.com'
  }
};

/* ===========================
   1.1) TRADUÇÕES MULTILÍNGUE (PT / EN / ES / FR) - VERSÃO COMPLETA
   =========================== */

const I18N = {
  'view.hoje': {
    'pt-BR': 'Hoje',
    'en-US': 'Today',
    'es-ES': 'Hoy',
    'fr-FR': "Aujourd'hui"
  },
  'view.todasRotinas': {
    'pt-BR': 'Todas as Rotinas',
    'en-US': 'All Routines',
    'es-ES': 'Todas las Rutinas',
    'fr-FR': 'Toutes les routines'
  },
  'view.calendario': {
    'pt-BR': 'Calendário',
    'en-US': 'Calendar',
    'es-ES': 'Calendario',
    'fr-FR': 'Calendrier'
  },
  'view.graficos': {
    'pt-BR': 'Gráficos',
    'en-US': 'Charts',
    'es-ES': 'Gráficos',
    'fr-FR': 'Graphiques'
  },
  'view.config': {
    'pt-BR': 'Configurações',
    'en-US': 'Settings',
    'es-ES': 'Configuración',
    'fr-FR': 'Paramètres'
  },

  // Menu principal
  'menu.visaoGeral': {
    'pt-BR': 'Visão Geral',
    'en-US': 'Overview',
    'es-ES': 'Resumen',
    'fr-FR': 'Vue d\'ensemble'
  },
  'menu.etiquetas': {
    'pt-BR': 'Etiquetas',
    'en-US': 'Tags',
    'es-ES': 'Etiquetas',
    'fr-FR': 'Étiquettes'
  },
  'menu.filtros': {
    'pt-BR': 'Filtros',
    'en-US': 'Filters',
    'es-ES': 'Filtros',
    'fr-FR': 'Filtres'
  },

  // Filtros
  'filter.pendentes': {
    'pt-BR': 'Pendentes',
    'en-US': 'Pending',
    'es-ES': 'Pendientes',
    'fr-FR': 'En attente'
  },
  'filter.concluidas': {
    'pt-BR': 'Concluídas',
    'en-US': 'Completed',
    'es-ES': 'Completadas',
    'fr-FR': 'Terminées'
  },
  'filter.alta': {
    'pt-BR': 'Prioridade alta',
    'en-US': 'High Priority',
    'es-ES': 'Prioridad alta',
    'fr-FR': 'Priorité haute'
  },
  'filter.media': {
    'pt-BR': 'Prioridade média',
    'en-US': 'Medium Priority',
    'es-ES': 'Prioridad media',
    'fr-FR': 'Priorité moyenne'
  },
  'filter.baixa': {
    'pt-BR': 'Prioridade baixa',
    'en-US': 'Low Priority',
    'es-ES': 'Prioridad baja',
    'fr-FR': 'Priorité basse'
  },
  'filter.semData': {
    'pt-BR': 'Sem data',
    'en-US': 'No Date',
    'es-ES': 'Sin fecha',
    'fr-FR': 'Sans date'
  },

  // Botões
  'button.novaRotina': {
    'pt-BR': '+ Nova rotina',
    'en-US': '+ New routine',
    'es-ES': '+ Nueva rutina',
    'fr-FR': '+ Nouvelle routine'
  },
  'button.novaEtiqueta': {
    'pt-BR': '+ Nova etiqueta',
    'en-US': '+ New tag',
    'es-ES': '+ Nueva etiqueta',
    'fr-FR': '+ Nouvelle étiquette'
  },
  'button.salvar': {
    'pt-BR': 'Salvar',
    'en-US': 'Save',
    'es-ES': 'Guardar',
    'fr-FR': 'Enregistrer'
  },
  'button.cancelar': {
    'pt-BR': 'Cancelar',
    'en-US': 'Cancel',
    'es-ES': 'Cancelar',
    'fr-FR': 'Annuler'
  },
  'button.adicionar': {
    'pt-BR': 'Adicionar',
    'en-US': 'Add',
    'es-ES': 'Añadir',
    'fr-FR': 'Ajouter'
  },
  'button.excluir': {
    'pt-BR': 'Excluir',
    'en-US': 'Delete',
    'es-ES': 'Eliminar',
    'fr-FR': 'Supprimer'
  },
  'button.duplicar': {
    'pt-BR': 'Duplicar',
    'en-US': 'Duplicate',
    'es-ES': 'Duplicar',
    'fr-FR': 'Dupliquer'
  },
  'button.saveSettings': {
    'pt-BR': 'Salvar Configurações',
    'en-US': 'Save Settings',
    'es-ES': 'Guardar configuración',
    'fr-FR': 'Enregistrer les paramètres'
  },
  'button.resetSettings': {
    'pt-BR': 'Restaurar Padrões',
    'en-US': 'Reset to Default',
    'es-ES': 'Restaurar valores',
    'fr-FR': 'Restaurer par défaut'
  },
  'button.editarPerfil': {
    'pt-BR': 'Editar perfil de usuário',
    'en-US': 'Edit user profile',
    'es-ES': 'Editar perfil de usuario',
    'fr-FR': 'Modifier le profil utilisateur'
  },
  'button.adicionarTarefa': {
    'pt-BR': '+ Adicionar',
    'en-US': '+ Add',
    'es-ES': '+ Añadir',
    'fr-FR': '+ Ajouter'
  },

  // Configurações
  'label.darkMode': {
    'pt-BR': 'Modo escuro',
    'en-US': 'Dark Mode',
    'es-ES': 'Modo oscuro',
    'fr-FR': 'Mode sombre'
  },
  'label.notifications': {
    'pt-BR': 'Ativar notificações do navegador',
    'en-US': 'Enable browser notifications',
    'es-ES': 'Activar notificaciones del navegador',
    'fr-FR': "Activer les notifications du navigateur"
  },
  'label.appLanguage': {
    'pt-BR': 'Idioma do aplicativo',
    'en-US': 'App Language',
    'es-ES': 'Idioma de la app',
    'fr-FR': "Langue de l'application"
  },
  'label.fontFamily': {
    'pt-BR': 'Fonte personalizada',
    'en-US': 'Font Family',
    'es-ES': 'Fuente',
    'fr-FR': 'Police'
  },
  'label.fontSize': {
    'pt-BR': 'Tamanho da fonte',
    'en-US': 'Font Size',
    'es-ES': 'Tamaño de fonte',
    'fr-FR': 'Taille de police'
  },

  // Perfil
  'profile.meuPerfil': {
    'pt-BR': 'Meu perfil',
    'en-US': 'My profile',
    'es-ES': 'Mi perfil',
    'fr-FR': 'Mon profil'
  },
  'profile.nomeExibido': {
    'pt-BR': 'Nome exibido',
    'en-US': 'Display name',
    'es-ES': 'Nombre visible',
    'fr-FR': "Nom affiché"
  },
  'profile.nomeUsuario': {
    'pt-BR': 'Nome de usuário',
    'en-US': 'Username',
    'es-ES': 'Nombre de usuario',
    'fr-FR': "Nom d'utilisateur"
  },
  'profile.email': {
    'pt-BR': 'E-mail',
    'en-US': 'Email',
    'es-ES': 'Correo electrónico',
    'fr-FR': 'Email'
  },
  'profile.mostrar': {
    'pt-BR': 'Mostrar',
    'en-US': 'Show',
    'es-ES': 'Mostrar',
    'fr-FR': 'Afficher'
  },
  'profile.ocultar': {
    'pt-BR': 'Ocultar',
    'en-US': 'Hide',
    'es-ES': 'Ocultar',
    'fr-FR': 'Cacher'
  },
  'profile.editar': {
    'pt-BR': 'Editar',
    'en-US': 'Edit',
    'es-ES': 'Editar',
    'fr-FR': 'Modifier'
  },
  'profile.changePhoto': {
    'pt-BR': 'Alterar Foto',
    'en-US': 'Change Photo',
    'es-ES': 'Cambiar Foto',
    'fr-FR': 'Changer la photo'
  },

  // Painel de detalhes
  'details.titulo': {
    'pt-BR': 'Título',
    'en-US': 'Title',
    'es-ES': 'Título',
    'fr-FR': 'Titre'
  },
  'details.descricao': {
    'pt-BR': 'Descrição',
    'en-US': 'Description',
    'es-ES': 'Descripción',
    'fr-FR': 'Description'
  },
  'details.data': {
    'pt-BR': 'Data',
    'en-US': 'Date',
    'es-ES': 'Fecha',
    'fr-FR': 'Date'
  },
  'details.hora': {
    'pt-BR': 'Hora',
    'en-US': 'Time',
    'es-ES': 'Hora',
    'fr-FR': 'Heure'
  },
  'details.prioridade': {
    'pt-BR': 'Prioridade',
    'en-US': 'Priority',
    'es-ES': 'Prioridad',
    'fr-FR': 'Priorité'
  },
  'details.etiqueta': {
    'pt-BR': 'Etiqueta',
    'en-US': 'Tag',
    'es-ES': 'Etiqueta',
    'fr-FR': 'Étiquette'
  },

  // Prioridades
  'priority.alta': {
    'pt-BR': 'Alta',
    'en-US': 'High',
    'es-ES': 'Alta',
    'fr-FR': 'Haute'
  },
  'priority.media': {
    'pt-BR': 'Média',
    'en-US': 'Medium',
    'es-ES': 'Media',
    'fr-FR': 'Moyenne'
  },
  'priority.baixa': {
    'pt-BR': 'Baixa',
    'en-US': 'Low',
    'es-ES': 'Baja',
    'fr-FR': 'Basse'
  },

  // Estados
  'status.todo': {
    'pt-BR': 'A fazer',
    'en-US': 'To do',
    'es-ES': 'Por hacer',
    'fr-FR': 'À faire'
  },
  'status.doing': {
    'pt-BR': 'Em progresso',
    'en-US': 'In progress',
    'es-ES': 'En progreso',
    'fr-FR': 'En cours'
  },
  'status.done': {
    'pt-BR': 'Concluído',
    'en-US': 'Done',
    'es-ES': 'Completado',
    'fr-FR': 'Terminé'
  },

  // Modal período personalizado
  'modal.periodoPersonalizado': {
    'pt-BR': 'Adicionar rotina com período personalizado',
    'en-US': 'Add routine with custom period',
    'es-ES': 'Agregar rutina con período personalizado',
    'fr-FR': 'Ajouter une routine avec période personnalisée'
  },
  'modal.tipoPeriodo': {
    'pt-BR': 'Tipo de período',
    'en-US': 'Period type',
    'es-ES': 'Tipo de período',
    'fr-FR': 'Type de période'
  },
  'modal.periodo': {
    'pt-BR': 'Período (início e fim)',
    'en-US': 'Range (start and end)',
    'es-ES': 'Período (inicio y fin)',
    'fr-FR': 'Période (début et fin)'
  },
  'modal.diasEspecificos': {
    'pt-BR': 'Dias específicos',
    'en-US': 'Specific days',
    'es-ES': 'Días específicos',
    'fr-FR': 'Jours spécifiques'
  },
  'modal.recorrente': {
    'pt-BR': 'Recorrente (semanal/mensal)',
    'en-US': 'Recurring (weekly/monthly)',
    'es-ES': 'Recurrente (semanal/mensual)',
    'fr-FR': 'Récurrent (hebdomadaire/mensuel)'
  },
  'modal.dataInicio': {
    'pt-BR': 'Data de início',
    'en-US': 'Start date',
    'es-ES': 'Fecha de inicio',
    'fr-FR': 'Date de début'
  },
  'modal.dataTermino': {
    'pt-BR': 'Data de término',
    'en-US': 'End date',
    'es-ES': 'Fecha de fin',
    'fr-FR': 'Date de fin'
  },
  'modal.repetirDias': {
    'pt-BR': 'Repetir nos dias da semana',
    'en-US': 'Repeat on weekdays',
    'es-ES': 'Repetir en días de semana',
    'fr-FR': 'Répéter les jours de semaine'
  },
  'modal.selecionarDatas': {
    'pt-BR': 'Selecionar datas',
    'en-US': 'Select dates',
    'es-ES': 'Seleccionar fechas',
    'fr-FR': 'Sélectionner les dates'
  },
  'modal.adicionarData': {
    'pt-BR': '+ Adicionar data',
    'en-US': '+ Add date',
    'es-ES': '+ Añadir fecha',
    'fr-FR': '+ Ajouter date'
  },
  'modal.inicio': {
    'pt-BR': 'Início',
    'en-US': 'Start',
    'es-ES': 'Inicio',
    'fr-FR': 'Début'
  },
  'modal.frequencia': {
    'pt-BR': 'Frequência',
    'en-US': 'Frequency',
    'es-ES': 'Frecuencia',
    'fr-FR': 'Fréquence'
  },
  'modal.repetirCada': {
    'pt-BR': 'Repetir a cada',
    'en-US': 'Repeat every',
    'es-ES': 'Repetir cada',
    'fr-FR': 'Répéter chaque'
  },
  'modal.terminar': {
    'pt-BR': 'Terminar',
    'en-US': 'End',
    'es-ES': 'Terminar',
    'fr-FR': 'Terminer'
  },
  'modal.nunca': {
    'pt-BR': 'Nunca',
    'en-US': 'Never',
    'es-ES': 'Nunca',
    'fr-FR': 'Jamais'
  },
  'modal.aposOcorrencias': {
    'pt-BR': 'Após ocorrências',
    'en-US': 'After occurrences',
    'es-ES': 'Después de ocurrencias',
    'fr-FR': 'Après occurrences'
  },
  'modal.emData': {
    'pt-BR': 'Em data',
    'en-US': 'On date',
    'es-ES': 'En fecha',
    'fr-FR': 'À date'
  },
  'modal.criarRotina': {
    'pt-BR': 'Criar rotina',
    'en-US': 'Create routine',
    'es-ES': 'Crear rutina',
    'fr-FR': 'Créer routine'
  },

  // Dias da semana
  'weekday.dom': {
    'pt-BR': 'Dom',
    'en-US': 'Sun',
    'es-ES': 'Dom',
    'fr-FR': 'Dim'
  },
  'weekday.seg': {
    'pt-BR': 'Seg',
    'en-US': 'Mon',
    'es-ES': 'Lun',
    'fr-FR': 'Lun'
  },
  'weekday.ter': {
    'pt-BR': 'Ter',
    'en-US': 'Tue',
    'es-ES': 'Mar',
    'fr-FR': 'Mar'
  },
  'weekday.qua': {
    'pt-BR': 'Qua',
    'en-US': 'Wed',
    'es-ES': 'Mié',
    'fr-FR': 'Mer'
  },
  'weekday.qui': {
    'pt-BR': 'Qui',
    'en-US': 'Thu',
    'es-ES': 'Jue',
    'fr-FR': 'Jeu'
  },
  'weekday.sex': {
    'pt-BR': 'Sex',
    'en-US': 'Fri',
    'es-ES': 'Vie',
    'fr-FR': 'Ven'
  },
  'weekday.sab': {
    'pt-BR': 'Sáb',
    'en-US': 'Sat',
    'es-ES': 'Sáb',
    'fr-FR': 'Sam'
  },

  // Frequências
  'frequency.daily': {
    'pt-BR': 'Diária',
    'en-US': 'Daily',
    'es-ES': 'Diaria',
    'fr-FR': 'Quotidienne'
  },
  'frequency.weekly': {
    'pt-BR': 'Semanal',
    'en-US': 'Weekly',
    'es-ES': 'Semanal',
    'fr-FR': 'Hebdomadaire'
  },
  'frequency.monthly': {
    'pt-BR': 'Mensal',
    'en-US': 'Monthly',
    'es-ES': 'Mensual',
    'fr-FR': 'Mensuelle'
  },

  // Etiquetas existentes
  'tag.pessoal': {
    'pt-BR': '#pessoal',
    'en-US': '#personal',
    'es-ES': '#personal',
    'fr-FR': '#personnel'
  },
  'tag.trabalho': {
    'pt-BR': '#trabalho',
    'en-US': '#work',
    'es-ES': '#trabajo',
    'fr-FR': '#travail'
  },
  'tag.saude': {
    'pt-BR': '#saúde',
    'en-US': '#health',
    'es-ES': '#salud',
    'fr-FR': '#santé'
  },
  'tag.estudos': {
    'pt-BR': '#estudos',
    'en-US': '#studies',
    'es-ES': '#estudios',
    'fr-FR': '#études'
  },
  'tag.geral': {
    'pt-BR': '#geral',
    'en-US': '#general',
    'es-ES': '#general',
    'fr-FR': '#général'
  },

  // Estados vazios
  'empty.none': {
    'pt-BR': 'Nenhuma rotina encontrada',
    'en-US': 'No routines found',
    'es-ES': 'No se encontraron rutinas',
    'fr-FR': "Aucune routine trouvée"
  },
  'empty.addRoutines': {
    'pt-BR': 'Adicione rotinas para ver os gráficos',
    'en-US': 'Add routines to see charts',
    'es-ES': 'Agregue rutinas para ver gráficos',
    'fr-FR': 'Ajoutez des routines para voir les graphiques'
  },

  // Toasts
  'toast.added': {
    'pt-BR': 'Rotina adicionada com sucesso!',
    'en-US': 'Routine added successfully!',
    'es-ES': '¡Rutina añadida con éxito!',
    'fr-FR': 'Routine ajoutée avec succès !'
  },
  'toast.saved': {
    'pt-BR': 'Foto do perfil atualizada com sucesso!',
    'en-US': 'Profile photo updated successfully!',
    'es-ES': '¡Foto de perfil actualizada con éxito!',
    'fr-FR': 'Photo de profil mise à jour avec succès !'
  },
  'toast.deleted': {
    'pt-BR': 'Rotina excluída com sucesso!',
    'en-US': 'Routine deleted successfully!',
    'es-ES': '¡Rutina eliminada con éxito!',
    'fr-FR': 'Routine supprimée avec succès !'
  },
  'toast.copied': {
    'pt-BR': 'Rotina duplicada com sucesso!',
    'en-US': 'Routine duplicated successfully!',
    'es-ES': '¡Rutina duplicada con éxito!',
    'fr-FR': 'Routine dupliquée avec succès !'
  },
  'toast.requiredTitle': {
    'pt-BR': 'O título é obrigatório!',
    'en-US': 'Title is required!',
    'es-ES': '¡El título es obligatorio!',
    'fr-FR': 'Le título est obligatoire !'
  },

  // Gráficos
  'chart.weeklyProgress': {
    'pt-BR': 'Progresso Semanal de Tarefas',
    'en-US': 'Weekly Task Progress',
    'es-ES': 'Progreso Semanal de Tareas',
    'fr-FR': "Progression Hebdomadaire des Tâches"
  },
  'chart.timeDistribution': {
    'pt-BR': 'Distribuição do Tempo',
    'en-US': 'Time Distribution',
    'es-ES': 'Distribución del Tiempo',
    'fr-FR': "Répartition du Temps"
  },
  'chart.habitsOverTime': {
    'pt-BR': 'Evolução de Hábitos',
    'en-US': 'Habits Over Time',
    'es-ES': 'Evolución de Hábitos',
    'fr-FR': "Évolution des Habitudes"
  },
  'chart.tagUsage': {
    'pt-BR': 'Uso das Etiquetas',
    'en-US': 'Tag Usage',
    'es-ES': 'Uso de Etiquetas',
    'fr-FR': 'Utilisation des Étiquettes'
  },
  'chart.infoWeekly': {
    'pt-BR': 'Acompanhe sua produtividade ao longo da semana',
    'en-US': 'Track your productivity throughout the week',
    'es-ES': 'Sigue tu productividad durante la semana',
    'fr-FR': 'Suivez votre productivité tout au long de la semaine'
  },
  'chart.infoTime': {
    'pt-BR': 'Veja como você distribui seu tempo entre diferentes atividades',
    'en-US': 'See how you distribute your time between different activities',
    'es-ES': 'Vea cómo distribuye su tempo entre diferentes actividades',
    'fr-FR': 'Voyez comment vous répartissez votre temps entre différentes activités'
  },
  'chart.infoHabits': {
    'pt-BR': 'Monitore a consistência dos seus hábitos ao longo do tempo',
    'en-US': 'Monitor the consistency of your habits over time',
    'es-ES': 'Monitore la consistencia de sus hábitos a lo largo del tiempo',
    'fr-FR': 'Surveillez la cohérence de vos habitudes au fil du temps'
  },
  'chart.infoTagUsage': {
    'pt-BR': 'Veja quantas rotinas utilizam cada etiqueta',
    'en-US': 'See how many routines use each tag',
    'es-ES': 'Vea cuántas rutinas utilizan cada etiqueta',
    'fr-FR': 'Voyez combien de routines utilisent chaque étiquette'
  },

  // Modal nova etiqueta
  'modal.novaEtiqueta': {
    'pt-BR': 'Nova etiqueta',
    'en-US': 'New tag',
    'es-ES': 'Nueva etiqueta',
    'fr-FR': 'Nouvelle étiquette'
  },
  'modal.nomeEtiqueta': {
    'pt-BR': 'Nome da etiqueta',
    'en-US': 'Tag name',
    'es-ES': 'Nombre de etiqueta',
    'fr-FR': 'Nom de l\'étiquette'
  },
  'modal.cor': {
    'pt-BR': 'Cor',
    'en-US': 'Color',
    'es-ES': 'Color',
    'fr-FR': 'Couleur'
  },

  // Calendário
  'calendar.mesAnterior': {
    'pt-BR': 'Mês anterior',
    'en-US': 'Previous month',
    'es-ES': 'Mes anterior',
    'fr-FR': 'Mois précédent'
  },
  'calendar.proximoMes': {
    'pt-BR': 'Próximo mês',
    'en-US': 'Next month',
    'es-ES': 'Próximo mes',
    'fr-FR': 'Mois suivant'
  },

  // Notificações
  'notification.test': {
    'pt-BR': 'Esta é uma notificação de teste do Life Build!',
    'en-US': 'This is a test notification from Life Build!',
    'es-ES': '¡Esta es una notificación de prueba de Life Build!',
    'fr-FR': 'Ceci est une notification de test de Life Build!'
  },
  'notification.reminder': {
    'pt-BR': '⏰ Lembrete: ',
    'en-US': '⏰ Reminder: ',
    'es-ES': '⏰ Recordatorio: ',
    'fr-FR': '⏰ Rappel: '
  },
  'notification.permissionDenied': {
    'pt-BR': 'Permissão para notificações foi negada. Por favor, habilite nas configurações do navegador.',
    'en-US': 'Notification permission was denied. Please enable in browser settings.',
    'es-ES': 'El permiso para notificaciones fue denegado. Por favor, habilite en la configuración del navegador.',
    'fr-FR': "L'autorisation de notification a été refusée. Veuillez l'activer dans les paramètres du navigateur."
  },
  'notification.unsupported': {
    'pt-BR': 'Seu navegador não suporta notificações',
    'en-US': 'Your browser does not support notifications',
    'es-ES': 'Tu navegador no admite notificaciones',
    'fr-FR': 'Votre navigateur ne prend pas en charge les notifications'
  },

  // Meses e dias da semana
  'months': {
    'pt-BR': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'es-ES': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'fr-FR': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  },
  'weekdays': {
    'pt-BR': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'es-ES': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    'fr-FR': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  }

};

/*
   2) ESTADO DA APLICAÇÃO
*/

// Estado global que guarda a informação atual do app (não persistida diretamente)
let state = {
  currentView: 'hoje',          // 'hoje' | 'todasRotinas' | 'calendario' | 'config'
  currentViewMode: 'lista',     // 'lista' | 'quadro' | 'calendario' | 'config'
  selectedTask: null,           // referência ao objeto de tarefa selecionado no painel de detalhes
  currentDate: new Date(),      // data usada pelo calendário (mês/ano)
  showSidebar: true,            // se a sidebar está visível
  routines: [],                 // array de rotinas (será carregado do localStorage)
  tags: [],                     // array de tags
  preferences: {},              // preferências do usuário (tema, mostrar concluídas, etc.)
  profile: {}                   // perfil do usuário
};

// Contador simples para gerar IDs únicos (inicia em 1000 para evitar colisão com IDs de exemplo)
let nextId = 1000;

/*
   3) SELETORES DO DOM
*/

// Guardamos referências a elementos do DOM para evitar querySelector repetido
const DOM = {
  app: document.querySelector('.app'),
  sidebar: document.getElementById('sidebar'),
  btnToggleSidebar: document.getElementById('btnToggleSidebar'),
  btnQuickAdd: document.getElementById('btnQuickAdd'),
  todayDate: document.getElementById('todayDate'),
  nowTime: document.getElementById('nowTime'),
  menuLinks: document.querySelectorAll('.menu-link[data-view]'),
  filterLinks: document.querySelectorAll('.menu-link[data-filter]'),
  tagList: document.getElementById('tagList'),
  btnAddTag: document.getElementById('btnAddTag'),
  viewTitle: document.getElementById('viewTitle'),
  viewHoje: document.getElementById('viewHoje'),
  viewTodasRotinas: document.getElementById('viewTodasRotinas'),
  viewQuadro: document.getElementById('viewQuadro'),
  viewCalendario: document.getElementById('viewCalendario'),
  viewConfig: document.getElementById('viewConfig'),
  viewGraficos: document.getElementById('viewGraficos'),
  taskListToday: document.getElementById('taskListToday'),
  todoList: document.querySelector('[data-col="todo"] .card-list'),
  doingList: document.querySelector('[data-col="doing"] .card-list'),
  doneList: document.querySelector('[data-col="done"] .card-list'),
  detailsPanel: document.getElementById('detailsPanel'),
  detailsClose: document.getElementById('detailsClose'),
  detailsForm: document.getElementById('detailsForm'),
  taskTitle: document.getElementById('taskTitle'),
  taskDesc: document.getElementById('taskDesc'),
  taskDate: document.getElementById('taskDate'),
  taskTime: document.getElementById('taskTime'),
  taskPriority: document.getElementById('taskPriority'),
  taskTag: document.getElementById('taskTag'),
  btnSaveTask: document.getElementById('btnSaveTask'),
  btnDeleteTask: document.getElementById('btnDeleteTask'),
  btnDuplicateTask: document.getElementById('btnDuplicateTask'),
  toastsContainer: document.getElementById('toasts'),
  // Configurações
  btnOpenConfig: document.getElementById('btnOpenConfig'),
  themeToggle: document.getElementById('themeToggle'),
  notificationsToggle: document.getElementById('notificationsToggle'),
  appLanguage: document.getElementById('appLanguage'),
  fontFamily: document.getElementById('fontFamily'),
  fontSize: document.getElementById('fontSize'),
  fontSizeValue: document.getElementById('fontSizeValue'),
  btnSaveSettings: document.getElementById('btnSaveSettings'),
  btnResetSettings: document.getElementById('btnResetSettings'),
  btnEditProfile: document.getElementById('btnEditProfile'),
  displayName: document.getElementById('displayName'),
  userName: document.getElementById('userName'),
  userEmail: document.getElementById('userEmail'),
  showEmail: document.getElementById('showEmail'),
  // Calendário
  calTitle: document.getElementById('calTitle'),
  calendarGrid: document.querySelector('.calendar-grid'),
  calPrev: document.getElementById('calPrev'),
  calNext: document.getElementById('calNext'),
  // Período personalizado
  modalCustomPeriod: document.getElementById('modalCustomPeriod'),
  customPeriodForm: document.getElementById('customPeriodForm'),
  customTitle: document.getElementById('customTitle'),
  customDesc: document.getElementById('customDesc'),
  customStartDate: document.getElementById('customStartDate'),
  customEndDate: document.getElementById('customEndDate'),
  customTime: document.getElementById('customTime'),
  customPriority: document.getElementById('customPriority'),
  customTag: document.getElementById('customTag'),
  periodTypeRadios: document.querySelectorAll('input[name="periodType"]'),
  periodRangeSection: document.getElementById('periodRangeSection'),
  periodSpecificSection: document.getElementById('periodSpecificSection'),
  periodRecurringSection: document.getElementById('periodRecurringSection'),
  addDateBtn: document.getElementById('addDateBtn'),
  specificDatesContainer: document.getElementById('specificDatesContainer'),
  recurringFrequency: document.getElementById('recurringFrequency'),
  recurringInterval: document.getElementById('recurringInterval'),
  intervalUnit: document.getElementById('intervalUnit'),
  recurringEndRadios: document.querySelectorAll('input[name="recurringEnd"]'),
  recurringOccurrences: document.getElementById('recurringOccurrences'),
  recurringEndDate: document.getElementById('recurringEndDate'),
  recurringStartDate: document.getElementById('recurringStartDate'),
  // Foto do perfil
  profilePhoto: document.getElementById('profilePhoto'),
  profilePhotoInput: document.getElementById('profilePhotoInput'),
  changePhotoBtn: document.getElementById('changePhotoBtn')
};

// Templates <template> do HTML (clonamos estes quando precisamos criar elementos)
const templates = {
  taskItem: document.getElementById('tplTaskItem'),
  boardCard: document.getElementById('tplBoardCard'),
  toast: document.getElementById('tplToast')
};

/*
   4) SISTEMA DE TRADUÇÃO
*/

// Obtém idioma atual (padrão pt-BR)
function getLang() {
  return (state.preferences.language || 'pt-BR');
}

// Traduz chave (key) com fallback
function t(key) {
  const lang = getLang();
  const entry = I18N[key];
  if (!entry) return key;
  return entry[lang] || entry['pt-BR'] || key;
}

// Aplica tradução nos elementos com data-i18n
function applyLanguageToDOM() {
  const lang = getLang();

  // Traduz elementos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key] && I18N[key][lang]) {
      el.textContent = I18N[key][lang];
    }
  });

  // Traduz placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[key] && I18N[key][lang]) {
      el.placeholder = I18N[key][lang];
    }
  });

  // Atualiza textos dinâmicos
  updateViewTitle();
  updateDynamicTexts();

  // Atualiza calendário e gráficos
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof initCharts === 'function') initCharts();

  // Atualiza textos específicos que não usam data-i18n
  updateSpecificTexts();
}

function updateDynamicTexts() {
  const lang = getLang();

  // Atualiza botão de nova rotina
  const quickAddBtn = document.getElementById('btnQuickAdd');
  if (quickAddBtn && I18N['button.novaRotina']) {
    quickAddBtn.textContent = I18N['button.novaRotina'][lang];
  }

  // Atualiza botão de nova etiqueta
  const addTagBtn = document.getElementById('btnAddTag');
  if (addTagBtn && I18N['button.novaEtiqueta']) {
    addTagBtn.textContent = I18N['button.novaEtiqueta'][lang];
  }
}

function updateSpecificTexts() {
  const lang = getLang();

  // Atualiza dias da semana no modal de período personalizado
  const weekdayLabels = {
    0: 'weekday.dom', 1: 'weekday.seg', 2: 'weekday.ter',
    3: 'weekday.qua', 4: 'weekday.qui', 5: 'weekday.sex', 6: 'weekday.sab'
  };

  document.querySelectorAll('.weekday-option').forEach((option, index) => {
    const span = option.querySelector('span');
    const key = weekdayLabels[index];
    if (span && key && I18N[key] && I18N[key][lang]) {
      span.textContent = I18N[key][lang];
    }
  });

  // Atualiza opções de frequência
  const frequencyOptions = document.querySelectorAll('#recurringFrequency option');
  if (frequencyOptions.length >= 3) {
    frequencyOptions[0].textContent = I18N['frequency.daily'][lang];
    frequencyOptions[1].textContent = I18N['frequency.weekly'][lang];
    frequencyOptions[2].textContent = I18N['frequency.monthly'][lang];
  }

  // Atualiza opções de prioridade
  updatePriorityOptions();
}

function updatePriorityOptions() {
  const lang = getLang();

  // Atualiza no painel de detalhes
  const priorityOptions = document.querySelectorAll('#taskPriority option');
  if (priorityOptions.length >= 3) {
    priorityOptions[0].textContent = I18N['priority.baixa'][lang];
    priorityOptions[1].textContent = I18N['priority.media'][lang];
    priorityOptions[2].textContent = I18N['priority.alta'][lang];
  }

  // Atualiza no modal personalizado
  const customPriorityOptions = document.querySelectorAll('#customPriority option');
  if (customPriorityOptions.length >= 3) {
    customPriorityOptions[0].textContent = I18N['priority.baixa'][lang];
    customPriorityOptions[1].textContent = I18N['priority.media'][lang];
    customPriorityOptions[2].textContent = I18N['priority.alta'][lang];
  }
}

// Toast multilíngue
function showToastTranslation(key, type = 'info') {
  const msg = t(key);
  showToast(msg, type);
}

// Recarrega a página ao trocar idioma
function changeLanguage(newLang) {
  state.preferences.language = newLang;
  saveData();
  applyLanguageToDOM();
  showToastTranslation('toast.saved', 'success');
}

/*
   5) INICIALIZAÇÃO
*/

// Função de inicialização que configura tudo e renderiza o estado inicial
function init() {
  // Carrega dados do localStorage (ou DEFAULT_DATA)
  loadData();

  // Garante que nextId seja maior que quaisquer IDs existentes (evita colisão)
  state.routines.forEach(t => {
    // tenta extrair número do id (assumindo formato 'tN')
    const match = String(t.id).replace(/^t/, '');
    const idNum = parseInt(match, 10);
    if (!isNaN(idNum) && idNum >= nextId) nextId = idNum + 1;
  });

  // Corrigir problemas do DOM
  fixDOMIssues();

  // Configura listeners de eventos (interações do usuário)
  setupEventListeners();

  // Configurar troca de foto do perfil
  setupProfilePhotoChange();
  setupPhotoChangeButton();

  // Carregar foto do perfil salva
  loadProfilePhoto();

  // Configurar notificações
  setupNotifications();
  setupNotificationToggle();

  // Atualiza relógio e agenda de atualização periódica
  updateClock();
  setInterval(updateClock, 60000); // atualiza a hora a cada minuto

  // Inicializa drag & drop do Kanban
  setupDragAndDrop();

  // Carrega configurações
  loadSettings();

  // Aplica traduções
  applyLanguageToDOM();

  // Renderiza etiquetas
  renderTags();

  // Atualizar visibilidade dos filtros
  updateFiltersVisibility();

  // Inicializar gráficos se estiver na view de gráficos
  if (state.currentView === 'graficos') {
    setTimeout(initCharts, 100);
  }

  // Renderiza a interface inicial de acordo com a view selecionada
  render();
}

// Função para verificar e corrigir elementos do DOM
function fixDOMIssues() {
  // Verificar se elementos críticos existem
  if (!DOM.viewGraficos) {
    console.warn('Elemento viewGraficos não encontrado');
  }

  if (!DOM.calendarGrid) {
    console.warn('Elemento calendarGrid não encontrado');
  }

  // Garantir que as seções de filtros e tags tenham os atributos corretos
  const filtersSection = document.querySelector('.section:nth-child(3)');
  const tagsSection = document.querySelector('.section:nth-child(2)');

  if (filtersSection) filtersSection.setAttribute('data-section', 'filters');
  if (tagsSection) tagsSection.setAttribute('data-section', 'tags');
}

// Controlar visibilidade dos filtros baseado na view atual
function updateFiltersVisibility() {
  const filtersSection = document.querySelector('.section[data-section="filters"]');
  const tagsSection = document.querySelector('.section[data-section="tags"]');

  // Views onde filtros e etiquetas devem aparecer
  const showInViews = ['hoje', 'todasRotinas', 'calendario'];

  if (filtersSection && tagsSection) {
    if (showInViews.includes(state.currentView)) {
      filtersSection.style.display = 'block';
      tagsSection.style.display = 'block';
    } else {
      filtersSection.style.display = 'none';
      tagsSection.style.display = 'none';
    }
  }
}

/*
   6) PERSISTÊNCIA (localStorage)
*/

// Carrega os dados salvos no localStorage. Se não existir, usa DEFAULT_DATA
function loadData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Usa fallback para cada parte caso esteja indefinida
      state.routines = parsedData.routines || DEFAULT_DATA.routines;
      state.tags = parsedData.tags || DEFAULT_DATA.tags;
      state.preferences = parsedData.preferences || DEFAULT_DATA.preferences;
      state.profile = parsedData.profile || DEFAULT_DATA.profile;
      state.showSidebar = parsedData.showSidebar !== undefined ? parsedData.showSidebar : true;
    } else {
      // Primeiro uso — carrega os dados padrão
      state.routines = DEFAULT_DATA.routines.slice();
      state.tags = DEFAULT_DATA.tags.slice();
      state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
      state.profile = Object.assign({}, DEFAULT_DATA.profile);
      state.showSidebar = true;
      // Salva imediatamente para criar a chave no localStorage
      saveData();
    }

    // Aplica preferências visuais (tema, sidebar layout)
    if (DOM.app) {
      DOM.app.setAttribute('data-theme', state.preferences.theme || 'light');
      DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
    }
  } catch (err) {
    console.error('Erro ao carregar dados do storage:', err);
    state.routines = DEFAULT_DATA.routines.slice();
    state.tags = DEFAULT_DATA.tags.slice();
    state.preferences = Object.assign({}, DEFAULT_DATA.preferences);
    state.profile = Object.assign({}, DEFAULT_DATA.profile);
    saveData();
  }
}

// Salva o estado relevante no localStorage
function saveData() {
  try {
    const dataToSave = {
      routines: state.routines,
      tags: state.tags,
      preferences: state.preferences,
      profile: state.profile,
      showSidebar: state.showSidebar
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // Se estiver na view de gráficos, atualizar os gráficos
    if (state.currentView === 'graficos') {
      initCharts();
    }
  } catch (err) {
    console.error('Erro ao salvar dados no storage:', err);
  }
}

/*
   7) UTILITÁRIOS (helpers)
*/

// Gera um ID único simples para novas rotinas (prefixo 't' + contador)
function generateId() {
  return 't' + (nextId++);
}

// Mostrar um toast (notificação temporária)
function showToast(message, type = 'info', duration = 3000) {
  if (!templates.toast || !DOM.toastsContainer) {
    console.log(`[${type}] ${message}`);
    return;
  }

  // Clona o template do toast
  const toastElement = templates.toast.content.cloneNode(true);
  const toast = toastElement.querySelector('.toast');
  // Insere o conteúdo e a classe de tipo
  toast.querySelector('.toast-content').textContent = message;
  toast.classList.add(type);

  // Adiciona o toast ao container (prepend para mostrar em cima)
  DOM.toastsContainer.prepend(toast);

  // Fecha ao clicar no botão 'close' interno
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toast.remove());

  // Auto-destrói após 'duration' ms
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => {
      try { toast.remove(); } catch (e) { }
    });
  }, duration);
}

// Converte um objeto Date em string 'YYYY-MM-DD' para inputs do tipo date
function formatDateForInput(date) {
  if (!date) return '';
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date.split('T')[0];
  }
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return '';
}

// Normaliza string de tag removendo '#' e espaços
function normalizeTag(tagStr) {
  if (!tagStr) return undefined;
  return tagStr.replace('#', '').trim();
}

/*
   8) CRUD DE ROTINAS (Add / Toggle / Open / Save / Delete / Duplicate)
*/

// Adiciona uma nova rotina ao estado e salva
function addNewRoutine({ title, description, date, time, priority, tag, status = 'todo', completed = false }) {
  // Validação mínima
  if (!title || !title.trim()) {
    showToastTranslation('toast.requiredTitle', 'error');
    return null;
  }

  // Normalizar etiqueta e verificar se existe
  let normalizedTag = tag ? normalizeTag(tag) : undefined;
  if (normalizedTag && !getTagByName(normalizedTag)) {
    addNewTag({
      name: normalizedTag,
      color: '#888'
    });
  }

  const newRoutine = {
    id: generateId(),
    title: title.trim(),
    description: description || '',
    date: date || undefined,
    time: time || undefined,
    priority: priority || 'medium',
    tag: normalizedTag,
    status: status,
    completed: !!completed
  };

  state.routines.push(newRoutine);
  saveData();
  render();
  showToastTranslation('toast.added', 'success');

  // Verificar se deve enviar notificação
  if (date && state.preferences.notifications) {
    setTimeout(() => sendReminderNotification(newRoutine), 1000);
  }

  return newRoutine;
}

// Alterna marcação de concluída/pendente para uma rotina pelo ID
function toggleTaskCompletion(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  // Inverte o booleano completed
  task.completed = !task.completed;

  // Ajuste do status se necessário
  if (task.completed) {
    task.status = 'done';
    showToast(`Rotina "${task.title}" concluída!`, 'success');
  } else {
    if (task.status === 'done') task.status = 'todo';
    showToast(`Rotina "${task.title}" marcada como pendente.`, 'info');
  }

  saveData();
  render();
}

// Abre painel de detalhes com o conteúdo da tarefa
function openTaskDetails(taskId) {
  const task = state.routines.find(t => t.id === taskId);
  if (!task || !DOM.detailsPanel) return;

  state.selectedTask = task;

  // Preenche o formulário com os dados da tarefa
  if (DOM.taskTitle) DOM.taskTitle.value = task.title || '';
  if (DOM.taskDesc) DOM.taskDesc.value = task.description || '';
  if (DOM.taskPriority) DOM.taskPriority.value = task.priority || 'medium';
  if (DOM.taskTag) DOM.taskTag.value = task.tag ? `#${task.tag}` : '';

  // Ajuste de data para input evitando problemas de timezone
  if (task.date) {
    const d = new Date(task.date + 'T00:00:00');
    DOM.taskDate.value = formatDateForInput(d);
  } else {
    if (DOM.taskDate) DOM.taskDate.value = '';
  }

  if (DOM.taskTime) DOM.taskTime.value = task.time || '';

  // Atualiza título do painel
  const detailsTitle = document.getElementById('detailsTitle');
  if (detailsTitle) detailsTitle.textContent = task.title;

  // Exibe painel de detalhes
  DOM.detailsPanel.setAttribute('aria-hidden', 'false');
  DOM.detailsPanel.classList.add('is-open');
}

// Fecha painel de detalhes e limpa seleção
function closeDetails() {
  state.selectedTask = null;
  if (!DOM.detailsPanel) return;
  DOM.detailsPanel.setAttribute('aria-hidden', 'true');
  DOM.detailsPanel.classList.remove('is-open');
  if (DOM.detailsForm) DOM.detailsForm.reset();
}

// Salva as alterações feitas no painel de detalhes
function saveTaskDetails(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!state.selectedTask) return;

  // Recupera os valores do formulário
  const title = DOM.taskTitle ? DOM.taskTitle.value.trim() : '';
  const description = DOM.taskDesc ? DOM.taskDesc.value : '';
  const date = DOM.taskDate ? DOM.taskDate.value || undefined : undefined;
  const time = DOM.taskTime ? DOM.taskTime.value || undefined : undefined;
  const priority = DOM.taskPriority ? DOM.taskPriority.value : 'medium';
  const tag = DOM.taskTag ? normalizeTag(DOM.taskTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Atualiza o objeto no estado
  const task = state.selectedTask;
  task.title = title; 0
  task.description = description;
  task.date = date;
  task.time = time;
  task.priority = priority;
  task.tag = tag;

  // Persistência e re-render
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.saved', 'success');
}

// Exclui a tarefa selecionada
function deleteCurrentTask() {
  if (!state.selectedTask) return;

  const confirmed = confirm(`Deseja realmente excluir a rotina "${state.selectedTask.title}"?`);
  if (!confirmed) return;

  state.routines = state.routines.filter(t => t.id !== state.selectedTask.id);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.deleted', 'info');
}

// Duplica a tarefa selecionada
function duplicateCurrentTask() {
  if (!state.selectedTask) return;

  const original = state.selectedTask;
  const copy = Object.assign({}, original, {
    id: generateId(),
    title: `Cópia de ${original.title}`,
    completed: false,
    status: 'todo'
  });

  state.routines.push(copy);
  saveData();
  render();
  closeDetails();
  showToastTranslation('toast.copied', 'success');
}

/*
   9) GESTÃO DE ETIQUETAS (TAGS)
*/

// Função para abrir o modal de nova etiqueta
function openAddTagModal() {
  const modal = document.getElementById('modalAddTag');
  if (!modal) return;

  // Limpar formulário
  const form = document.getElementById('addTagForm');
  if (form) form.reset();

  // Definir cor padrão
  const colorInput = document.getElementById('tagColor');
  if (colorInput) colorInput.value = '#4f46e5';

  // Focar no campo de nome
  const nameInput = document.getElementById('tagName');
  if (nameInput) nameInput.focus();

  // Abrir modal
  if (modal.showModal) {
    modal.showModal();
  }
}

// Função para processar o formulário de nova etiqueta
function processAddTagForm(e) {
  if (e && e.preventDefault) e.preventDefault();

  // Verificar se é o botão cancelar
  const submitter = e.submitter;
  if (submitter && submitter.value === 'cancel') {
    closeAddTagModal();
    return;
  }

  // Coletar dados do formulário
  const nameInput = document.getElementById('tagName');
  const colorInput = document.getElementById('tagColor');

  if (!nameInput || !colorInput) return;

  const name = nameInput.value.trim();
  const color = colorInput.value;

  // Validação
  if (!name) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  // Adicionar etiqueta
  addNewTag({ name, color });

  // Fechar modal
  closeAddTagModal();
}

// Função para fechar o modal de etiqueta
function closeAddTagModal() {
  const modal = document.getElementById('modalAddTag');
  if (!modal) return;

  // Limpar formulário
  const form = document.getElementById('addTagForm');
  if (form) form.reset();

  // Fechar modal
  if (modal.close) modal.close();
}

// Adiciona nova etiqueta ao estado (verifica duplicidade por nome)
function addNewTag({ name, color }) {
  if (!name || !name.trim()) {
    showToast('O nome da etiqueta é obrigatório.', 'error');
    return null;
  }

  const normalized = name.trim().toLowerCase();

  // Verificar se já existe (case insensitive)
  if (state.tags.some(t => t.name.toLowerCase() === normalized)) {
    showToast('Esta etiqueta já existe!', 'error');
    return null;
  }

  const newTag = {
    id: `tag${Date.now()}`,
    name: normalized,
    color: color || '#888'
  };

  state.tags.push(newTag);
  saveData();
  renderTags();

  const lang = getLang();
  const successMessages = {
    'pt-BR': `Etiqueta #${newTag.name} adicionada!`,
    'en-US': `Tag #${newTag.name} added!`,
    'es-ES': `¡Etiqueta #${newTag.name} añadida!`,
    'fr-FR': `Étiquette #${newTag.name} ajoutée !`
  };

  showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
  return newTag;
}

/*
   9.1) GESTÃO AVANÇADA DE ETIQUETAS (Exclusão)
*/

// Função para excluir uma etiqueta
function deleteTag(tagId) {
  const tag = state.tags.find(t => t.id === tagId);
  if (!tag) return;

  // Verificar se a etiqueta está em uso
  const routinesUsingTag = state.routines.filter(routine => routine.tag === tag.name);

  if (routinesUsingTag.length > 0) {
    showDeleteTagConfirmation(tag, routinesUsingTag.length);
  } else {
    confirmDeleteTag(tag);
  }
}

// Mostrar modal de confirmação para etiquetas em uso
function showDeleteTagConfirmation(tag, usageCount) {
  const modal = document.createElement('dialog');
  modal.className = 'modal confirm-delete';
  modal.innerHTML = `
        <form method="dialog" class="modal-content">
            <header class="modal-header">
                <h2>Excluir Etiqueta</h2>
            </header>
            <div class="modal-body">
                <p>A etiqueta <strong>#${tag.name}</strong> está sendo usada em <strong>${usageCount}</strong> rotina(s).</p>
                <p>O que você gostaria de fazer?</p>
            </div>
            <footer class="modal-footer confirm-delete-actions">
                <button class="btn ghost" value="cancel">Cancelar</button>
                <button class="btn danger" value="remove">Remover das rotinas e excluir</button>
                <button class="btn" value="keep">Manter etiqueta</button>
            </footer>
        </form>
    `;

  document.body.appendChild(modal);

  if (modal.showModal) {
    modal.showModal();
  }

  modal.addEventListener('close', () => {
    const returnValue = modal.returnValue;
    if (returnValue === 'remove') {
      removeTagFromRoutinesAndDelete(tag);
    }
    modal.remove();
  });
}

// Remover etiqueta de todas as rotinas e excluir
function removeTagFromRoutinesAndDelete(tag) {
  // Remover a etiqueta de todas as rotinas
  state.routines.forEach(routine => {
    if (routine.tag === tag.name) {
      routine.tag = undefined;
    }
  });

  // Excluir a etiqueta
  confirmDeleteTag(tag);

  const lang = getLang();
  const successMessages = {
    'pt-BR': `Etiqueta #${tag.name} removida de todas as rotinas e excluída!`,
    'en-US': `Tag #${tag.name} removed from all routines and deleted!`,
    'es-ES': `¡Etiqueta #${tag.name} eliminada de todas las rutinas y borrada!`,
    'fr-FR': `Étiquette #${tag.name} supprimée de toutes les routines et effacée !`
  };

  showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
}

// Confirmar exclusão da etiqueta
function confirmDeleteTag(tag) {
  state.tags = state.tags.filter(t => t.id !== tag.id);
  saveData();
  renderTags();

  const lang = getLang();
  const successMessages = {
    'pt-BR': `Etiqueta #${tag.name} excluída!`,
    'en-US': `Tag #${tag.name} deleted!`,
    'es-ES': `¡Etiqueta #${tag.name} eliminada!`,
    'fr-FR': `Étiquette #${tag.name} supprimée !`
  };

  showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
}

// Contar quantas rotinas usam uma etiqueta
function countTagUsage(tagName) {
  return state.routines.filter(routine => routine.tag === tagName).length;
}

/*
   9.2) RENDERIZAÇÃO ATUALIZADA DAS ETIQUETAS
*/

// Renderiza as tags na sidebar com botão de exclusão
function renderTags() {
  if (!DOM.tagList) return;

  // Limpar lista atual
  DOM.tagList.innerHTML = '';

  // Atualizar datalist para sugestões
  const datalist = document.getElementById('datalistTags');
  if (datalist) {
    datalist.innerHTML = '';

    state.tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = `#${tag.name}`;
      datalist.appendChild(option);
    });
  }

  // Se não houver etiquetas, mostrar mensagem
  if (state.tags.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'empty-state';
    emptyMsg.textContent = 'Nenhuma etiqueta criada';
    emptyMsg.style.padding = '8px';
    emptyMsg.style.color = 'var(--color-text-secondary)';
    emptyMsg.style.fontStyle = 'italic';
    DOM.tagList.appendChild(emptyMsg);
    return;
  }

  // Renderizar cada etiqueta
  state.tags.forEach(tag => {
    const li = document.createElement('li');
    const tagContainer = document.createElement('div');
    tagContainer.className = 'tag-container';

    const a = document.createElement('a');
    a.className = 'tag';
    a.href = '#';
    a.dataset.tag = tag.name;

    // Texto da etiqueta
    const tagText = document.createElement('span');
    tagText.textContent = `#${tag.name}`;
    a.appendChild(tagText);

    // Adicionar contador de uso
    const usageCount = countTagUsage(tag.name);
    if (usageCount > 0) {
      const countSpan = document.createElement('span');
      countSpan.className = 'tag-count';
      countSpan.textContent = usageCount;
      a.appendChild(countSpan);
    }

    // Verificar se esta etiqueta está ativa
    const activeTagLink = document.querySelector('.tag.is-active');
    if (activeTagLink && activeTagLink.dataset.tag === tag.name) {
      a.classList.add('is-active');
    }

    // Aplicar cor da etiqueta
    a.style.borderColor = tag.color;
    a.style.color = tag.color;
    a.style.backgroundColor = tag.color + '15'; // Mais transparente

    // Botão de excluir (agora com classe CSS para aparecer apenas no hover)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'tag-delete';
    deleteBtn.innerHTML = '✕';
    deleteBtn.setAttribute('aria-label', `Excluir etiqueta ${tag.name}`);
    deleteBtn.title = 'Excluir etiqueta';

    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      deleteTag(tag.id);
    });

    a.appendChild(deleteBtn);

    // Evento de clique para filtrar por etiqueta
    a.addEventListener('click', (e) => {
      if (!e.target.classList.contains('tag-delete')) {
        e.preventDefault();
        filterByTag(tag.name);
      }
    });

    // Efeitos de hover melhorados
    a.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    a.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });

    tagContainer.appendChild(a);
    li.appendChild(tagContainer);
    DOM.tagList.appendChild(li);
  });
}

// Função para filtrar por etiqueta
function filterByTag(tagName) {
  // Limpar filtros ativos
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
  }

  // Limpar outras etiquetas ativas
  const allTags = document.querySelectorAll('.tag');
  allTags.forEach(tag => tag.classList.remove('is-active'));

  // Marcar etiqueta atual como ativa
  const currentTag = document.querySelector(`.tag[data-tag="${tagName}"]`);
  if (currentTag) {
    currentTag.classList.add('is-active');
  }

  // Renderizar a view atual com o filtro aplicado
  render();

  const lang = getLang();
  const filterMessages = {
    'pt-BR': `Filtrado por #${tagName}`,
    'en-US': `Filtered by #${tagName}`,
    'es-ES': `Filtrado por #${tagName}`,
    'fr-FR': `Filtré par #${tagName}`
  };

  showToast(filterMessages[lang] || filterMessages['pt-BR'], 'info');

  // Função para abrir modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  // Função para fechar modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // Fechar modal ao clicar fora do conteúdo
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  });

  // Fechar modal com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal.is-open');
      openModals.forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

// Função para obter etiqueta por nome
function getTagByName(tagName) {
  return state.tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
}

/* 
   10) FILTRAGEM E LISTAGEM DE TAREFAS
*/

// Retorna um array de tarefas filtradas de acordo com a view atual e filtros rápidos
function getFilteredTasks() {
  // Começa com uma cópia de todas as tasks
  let tasks = state.routines.slice();

  // Constroi data de referência para hoje (00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtra conforme state.currentView
  switch (state.currentView) {
    case 'hoje':
      tasks = tasks.filter(task => {
        if (!task.date) return false;
        const td = new Date(task.date + 'T00:00:00');
        td.setHours(0, 0, 0, 0);
        return td.getTime() === today.getTime();
      });
      break;
    case 'todasRotinas':
      // sem filtro por data - mostra todas
      break;
    case 'calendario':
      // Apenas tarefas com data aparecem no calendário
      tasks = tasks.filter(task => task.date);
      break;
    case 'graficos':
    case 'config':
      // Não mostrar tasks nessas views
      tasks = [];
      break;
    default:
      break;
  }

  // Filtros rápidos ativos na sidebar (um por vez)
  const activeFilterLink = document.querySelector('.menu-link[data-filter].is-active');
  if (activeFilterLink) {
    const filter = activeFilterLink.dataset.filter;
    tasks = applyFilter(tasks, filter);
  }

  // Filtro por etiqueta ativo
  const activeTagLink = document.querySelector('.tag.is-active');
  if (activeTagLink) {
    const tagName = activeTagLink.dataset.tag;
    tasks = tasks.filter(task => task.tag && task.tag.toLowerCase() === tagName.toLowerCase());
  }

  // Se não houver filtro ativo, aplica preferência global de mostrar ou não concluídas
  if (!activeFilterLink && !activeTagLink) {
    if (!state.preferences.showCompleted) {
      tasks = tasks.filter(t => !t.completed);
    }
  }

  return tasks;
}

// Aplica filtro específico ao array de tarefas
function applyFilter(tasks, filter) {
  switch (filter) {
    case 'pendentes':
      return tasks.filter(t => !t.completed);
    case 'concluidas':
      return tasks.filter(t => t.completed);
    case 'alta':
      return tasks.filter(t => t.priority === 'high');
    case 'media':
      return tasks.filter(t => t.priority === 'medium');
    case 'baixa':
      return tasks.filter(t => t.priority === 'low');
    case 'semData':
      return tasks.filter(t => !t.date);
    default:
      return tasks;
  }
}

/*
   11) RENDERIZAÇÃO (Lista / Quadro / Calendário / Config)
*/

// Atualiza título da view (ex.: Hoje, Calendário)
function updateViewTitle() {
  const titles = {
    'hoje': t('view.hoje'),
    'todasRotinas': t('view.todasRotinas'),
    'calendario': t('view.calendario'),
    'config': t('view.config'),
    'graficos': t('view.graficos')
  };
  if (DOM.viewTitle) DOM.viewTitle.textContent = titles[state.currentView] || 'Rotinas';
}

// Renderiza a lista principal (usada no modo 'lista')
function renderTaskList() {
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`;
  const activeView = document.getElementById(activeViewId);
  if (activeView) {
    targetList = activeView.querySelector('.task-list');
  }
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';
  const tasks = getFilteredTasks();
  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    targetList.appendChild(empty);
    return;
  }
  tasks.forEach(task => targetList.appendChild(createTaskElement(task)));
}

// Renderiza lista específica (usada quando filtramos por tag, por exemplo)
function renderTaskListWithTasks(tasks) {
  let targetList = null;
  const activeViewId = `view${state.currentView.charAt(0).toUpperCase()}${state.currentView.slice(1)}`;
  const activeView = document.getElementById(activeViewId);
  if (activeView) targetList = activeView.querySelector('.task-list');
  if (!targetList) targetList = DOM.taskListToday;
  if (!targetList) return;
  targetList.innerHTML = '';

  if (!tasks || tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = t('empty.none');
    DOM.taskListToday.appendChild(empty);
    return;
  }
  tasks.forEach(task => {
    const el = createTaskElement(task);
    DOM.taskListToday.appendChild(el);
  });
}

// Render principal que decide qual modo desenhar
function render() {
  updateViewTitle();
  renderTags();
  updateFilterIndicators();

  // Atualizar visibilidade dos filtros
  updateFiltersVisibility();

  // Oculta todas as views primeiro
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('is-active'));

  // Mostra a view ativa baseada no currentView
  switch (state.currentView) {
    case 'hoje':
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
      break;
    case 'todasRotinas':
      if (DOM.viewTodasRotinas) DOM.viewTodasRotinas.classList.add('is-active');
      renderTaskList();
      break;
    case 'calendario':
      if (DOM.viewCalendario) DOM.viewCalendario.classList.add('is-active');
      renderCalendar();
      break;
    case 'config':
      if (DOM.viewConfig) DOM.viewConfig.classList.add('is-active');
      renderProfile();
      break;
    case 'graficos':
      if (DOM.viewGraficos) DOM.viewGraficos.classList.add('is-active');
      initCharts();
      break;
    default:
      if (DOM.viewHoje) DOM.viewHoje.classList.add('is-active');
      renderTaskList();
  }
}

/*
  11.1) Render - Quadro Kanban
*/

// Renderiza o quadro Kanban preenchendo as colunas por status
function renderBoard() {
  if (!DOM.todoList || !DOM.doingList || !DOM.doneList) return;
  DOM.todoList.innerHTML = '';
  DOM.doingList.innerHTML = '';
  DOM.doneList.innerHTML = '';

  // Usa getFilteredTasks para respeitar filtros
  const tasks = getFilteredTasks();

  // Para cada tarefa, cria um card e o coloca na coluna correta
  tasks.forEach(task => {
    const card = createBoardCard(task);
    if (task.status === 'done') DOM.doneList.appendChild(card);
    else if (task.status === 'doing') DOM.doingList.appendChild(card);
    else DOM.todoList.appendChild(card);
  });

  // Atualiza contadores (se existirem no DOM)
  const todoCount = document.getElementById('todoCount');
  const doingCount = document.getElementById('doingCount');
  const doneCount = document.getElementById('doneCount');
  if (todoCount) todoCount.textContent = `${DOM.todoList.children.length} itens`;
  if (doingCount) doingCount.textContent = `${DOM.doingList.children.length} itens`;
  if (doneCount) doneCount.textContent = `${DOM.doneList.children.length} itens`;
}

/*
  11.2) Render - Calendário
*/

// Renderiza o calendário do mês atual (state.currentDate)
function renderCalendar() {
  if (!DOM.calendarGrid || !DOM.calTitle) return;

  // Limpa grid
  DOM.calendarGrid.innerHTML = '';

  // Ano e mês atuais
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  // Nome do mês
  const lang = getLang();
  const monthNames = I18N.months[lang];
  DOM.calTitle.textContent = `${monthNames[month]} ${year}`;

  // Determina primeiro dia da semana do mês e quantidade de dias
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Cabeçalho (dias da semana)
  const dayNames = I18N.weekdays[lang];
  dayNames.forEach(d => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = d;
    DOM.calendarGrid.appendChild(header);
  });

  // Dias do mês anterior (preenchimento)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayEl = createCalendarDay(prevMonthDays - i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Dias do mês atual - USANDO TAREFAS FILTRADAS
  const tasks = getFilteredTasks();
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year);
    const fullDate = new Date(year, month, d);
    const dayEl = createCalendarDay(d, false, isToday, fullDate, tasks);
    DOM.calendarGrid.appendChild(dayEl);
  }

  // Preenchimento do próximo mês para completar 6 linhas (42 células)
  const totalCells = 42;
  const daysSoFar = firstDayOfMonth + daysInMonth;
  const nextMonthDays = totalCells - daysSoFar;
  for (let i = 1; i <= nextMonthDays; i++) {
    const dayEl = createCalendarDay(i, true);
    DOM.calendarGrid.appendChild(dayEl);
  }
}

/* Cria um elemento de dia para o calendário */
function createCalendarDay(day, isOtherMonth, isToday = false, fullDate = null, tasks = []) {
  const cell = document.createElement('div');
  cell.className = 'calendar-day';
  if (isOtherMonth) cell.classList.add('other-month');
  if (isToday) cell.classList.add('today');

  // Número do dia
  const number = document.createElement('div');
  number.className = 'calendar-day-number';
  number.textContent = day;
  cell.appendChild(number);

  // Se fullDate é passado, queremos também colocar eventos desse dia
  if (fullDate && tasks) {
    // Busca tarefas cuja data corresponde ao fullDate DENTRO DAS TAREFAS JÁ FILTRADAS
    const tasksForDay = tasks.filter(task => {
      if (!task.date) return false;
      const taskDate = new Date(task.date + 'T00:00:00');
      return taskDate.getDate() === fullDate.getDate()
        && taskDate.getMonth() === fullDate.getMonth()
        && taskDate.getFullYear() === fullDate.getFullYear();
    });

    // Para cada tarefa, adiciona um botão/evento no dia
    tasksForDay.forEach(task => {
      const ev = document.createElement('button');
      ev.className = `calendar-event priority-${task.priority || 'medium'}`;
      if (task.isRecurring || task.parentRoutineId) {
        ev.classList.add('has-multiple-dates');
      }
      ev.textContent = task.title.length > 30 ? task.title.slice(0, 27) + '...' : task.title;
      ev.addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskDetails(task.id);
      });
      cell.appendChild(ev);
    });

    // Ao clicar no día (fora de eventos), abre modal de período personalizado com a data preenchida
    cell.addEventListener('click', (e) => {
      if (e.target && e.target.matches('.calendar-event')) return;
      if (!DOM.modalCustomPeriod) return;
      const dateStr = formatDateForInput(fullDate);
      if (DOM.customStartDate) DOM.customStartDate.value = dateStr;
      if (DOM.customEndDate) DOM.customEndDate.value = dateStr;
      if (DOM.recurringStartDate) DOM.recurringStartDate.value = dateStr;
      openCustomPeriodModal();
    });
  }

  return cell;
}

/*
   12) CRIAÇÃO DE ELEMENTOS (task item e board card)
*/

// Cria e retorna um elemento li.populado para a lista usando o template tplTaskItem
function createTaskElement(task) {
  if (!templates.taskItem) {
    const li = document.createElement('li');
    li.textContent = task.title;
    return li;
  }

  // Clona o template
  const clone = templates.taskItem.content.cloneNode(true);
  const li = clone.querySelector('li');
  li.dataset.taskId = task.id;
  if (task.completed) li.classList.add('is-completed');
  if (task.isRecurring || task.parentRoutineId) {
    li.classList.add('has-multiple-dates');
  }

  // Checkbox para concluir/toggle
  const checkbox = clone.querySelector('.checkbox input');
  if (checkbox) {
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
  }

  // Título
  const titleEl = clone.querySelector('.task-title');
  if (titleEl) titleEl.textContent = task.title || '';

  // Due / data
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority';
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium');
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        tagEl.style.backgroundColor = tagInfo.color + '20';
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Botão abrir detalhes
  const openBtn = clone.querySelector('.task-open');
  if (openBtn) openBtn.addEventListener('click', () => openTaskDetails(task.id));

  // Drag start (para Kanban)
  li.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  return clone;
}

// Cria e retorna um card para o quadro a partir do template tplBoardCard
function createBoardCard(task) {
  if (!templates.boardCard) {
    const div = document.createElement('div');
    div.textContent = task.title;
    return div;
  }

  const clone = templates.boardCard.content.cloneNode(true);
  const card = clone.querySelector('.card');
  card.dataset.taskId = task.id;
  card.draggable = true;
  if (task.completed) card.classList.add('is-completed');
  if (task.isRecurring || task.parentRoutineId) {
    card.classList.add('has-multiple-dates');
  }

  // Título
  const title = clone.querySelector('.card-title');
  if (title) title.textContent = task.title;

  // Due date
  const dueEl = clone.querySelector('.due');
  if (dueEl) {
    if (task.date) {
      const d = new Date(task.date + 'T00:00:00');
      dueEl.textContent = d.toLocaleDateString(getLang());
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!task.completed && d < today) dueEl.classList.add('overdue');
      else dueEl.classList.remove('overdue');
    } else {
      dueEl.textContent = t('filter.semData');
    }
  }

  // Priority
  const prioEl = clone.querySelector('.priority');
  if (prioEl) {
    prioEl.className = 'priority';
    const priorityText = {
      'high': t('filter.alta'),
      'medium': t('filter.media'),
      'low': t('filter.baixa')
    };
    prioEl.textContent = priorityText[task.priority] || t('filter.media');
    prioEl.classList.add(task.priority || 'medium');
  }

  // Tag
  const tagEl = clone.querySelector('.tag');
  if (tagEl) {
    if (task.tag) {
      tagEl.textContent = `#${task.tag}`;
      const tagInfo = state.tags.find(t => t.name === task.tag);
      if (tagInfo) {
        tagEl.style.backgroundColor = tagInfo.color + '20';
        tagEl.style.color = tagInfo.color;
      }
    } else {
      tagEl.textContent = '#geral';
    }
  }

  // Status visual
  const statusEl = clone.querySelector('.status');
  if (statusEl) {
    if (task.status === 'done') statusEl.style.backgroundColor = '#10b981';
    else if (task.status === 'doing') statusEl.style.backgroundColor = '#f59e0b';
    else statusEl.style.backgroundColor = '#e5e7eb';
  }

  // Ações (detalhes e concluir/desfazer)
  const actionButtons = clone.querySelectorAll('.card-actions button');
  if (actionButtons.length >= 2) {
    actionButtons[0].addEventListener('click', () => openTaskDetails(task.id));
    actionButtons[1].textContent = task.completed ? t('button.desfazer') : t('button.concluir');
    actionButtons[1].addEventListener('click', () => toggleTaskCompletion(task.id));
  }

  // Drag start
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
  });

  return clone;
}

/*
   13) DRAG & DROP (Kanban)
*/

// Configura eventos de drag & drop nas colunas
function setupDragAndDrop() {
  const columns = document.querySelectorAll('.column');
  if (!columns || columns.length === 0) return;

  columns.forEach(col => {
    col.addEventListener('dragenter', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });
    col.addEventListener('drop', handleDrop);
  });

  document.addEventListener('dragover', (e) => { e.preventDefault(); });
}

// Handler quando um item é dropado em uma coluna
function handleDrop(e) {
  e.preventDefault();
  const col = e.currentTarget;
  col.classList.remove('drag-over');

  const taskId = e.dataTransfer.getData('text/plain');
  if (!taskId) return;

  const newStatus = col.dataset.col;
  const task = state.routines.find(t => t.id === taskId);
  if (!task) return;

  task.status = newStatus || 'todo';
  task.completed = newStatus === 'done';

  saveData();
  render();

  const statusText = {
    'todo': 'A fazer',
    'doing': 'Em progresso',
    'done': 'Concluído'
  };
  showToast(`Rotina movida para: ${statusText[newStatus] || 'A fazer'}`, 'info');
}

/*
   14) CONFIGURAÇÕES E PREFERÊNCIAS - FUNÇÕES ATUALIZADAS
*/

// Carrega as configurações salvas
function loadSettings() {
  if (state.preferences) {
    // Tema
    if (state.preferences.theme) {
      DOM.app.setAttribute('data-theme', state.preferences.theme);
      if (DOM.themeToggle) DOM.themeToggle.checked = state.preferences.theme === 'dark';
    }

    // Notificações
    if (DOM.notificationsToggle && state.preferences.notifications !== undefined) {
      DOM.notificationsToggle.checked = state.preferences.notifications;
    }

    // Idioma
    if (DOM.appLanguage && state.preferences.language) {
      DOM.appLanguage.value = state.preferences.language;
    }

    // Fonte - APLICAR AO ELEMENTO HTML (RAIZ)
    if (DOM.fontFamily && state.preferences.fontFamily) {
      DOM.fontFamily.value = state.preferences.fontFamily;
      document.documentElement.style.fontFamily = state.preferences.fontFamily;
    }

    // Tamanho da fonte - APLICAR AO ELEMENTO HTML (RAIZ)
    if (DOM.fontSize && state.preferences.fontSize) {
      DOM.fontSize.value = state.preferences.fontSize;
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';
      document.documentElement.style.fontSize = state.preferences.fontSize + 'px';
    }
  }

  // Carregar foto do perfil
  loadProfilePhoto();
}

// Salva as configurações - FUNÇÃO ATUALIZADA
function saveSettings() {
  state.preferences = {
    theme: DOM.themeToggle && DOM.themeToggle.checked ? 'dark' : 'light',
    notifications: DOM.notificationsToggle ? DOM.notificationsToggle.checked : false,
    language: DOM.appLanguage ? DOM.appLanguage.value : 'pt-BR',
    fontFamily: DOM.fontFamily ? DOM.fontFamily.value : 'Inter',
    fontSize: DOM.fontSize ? DOM.fontSize.value : '16',
    showCompleted: state.preferences.showCompleted !== undefined ? state.preferences.showCompleted : true
  };

  // Se as notificações estão sendo ativadas, solicitar permissão
  if (state.preferences.notifications) {
    requestNotificationPermission().then(permissionGranted => {
      if (!permissionGranted) {
        state.preferences.notifications = false;
        if (DOM.notificationsToggle) {
          DOM.notificationsToggle.checked = false;
        }
        saveData();
      } else {
        setTimeout(sendTestNotification, 1000);
      }
    });
  }

  // Garantir que a foto do perfil seja preservada
  if (state.profile && state.profile.photo) {
    state.preferences.profilePhoto = state.profile.photo;
  }

  // Aplica as configurações
  DOM.app.setAttribute('data-theme', state.preferences.theme);

  // APLICAR FONTE E TAMANHO DA FONTE AO ELEMENTO HTML (RAIZ)
  document.documentElement.style.fontFamily = state.preferences.fontFamily;
  document.documentElement.style.fontSize = state.preferences.fontSize + 'px';

  if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = state.preferences.fontSize + 'px';

  saveData();
  showToastTranslation('toast.saved', 'success');
}

// Restaura configurações padrão - FUNÇÃO ATUALIZADA
function resetSettings() {
  const confirmed = confirm('Deseja restaurar as configurações padrão?');
  if (!confirmed) return;

  state.preferences = {
    theme: 'light',
    notifications: false,
    language: 'pt-BR',
    fontFamily: 'Inter',
    fontSize: '16',
    showCompleted: true
  };

  // APLICAR RESET AO ELEMENTO HTML (RAIZ)
  document.documentElement.style.fontFamily = 'Inter';
  document.documentElement.style.fontSize = '16px';

  loadSettings();
  saveData();
  applyLanguageToDOM();
  showToastTranslation('toast.saved', 'info');
}

// Alterna o tema
function toggleTheme() {
  const newTheme = DOM.themeToggle.checked ? 'dark' : 'light';
  DOM.app.setAttribute('data-theme', newTheme);
  state.preferences.theme = newTheme;
  saveData();
}

// Renderiza o perfil do usuário
function renderProfile() {
  if (DOM.displayName && state.profile.displayName) {
    DOM.displayName.textContent = state.profile.displayName;
  }
  if (DOM.userName && state.profile.userName) {
    DOM.userName.textContent = state.profile.userName;
  }
  if (DOM.userEmail && state.profile.email) {
    DOM.userEmail.textContent = state.profile.email;
  }
}

/*
   15) SISTEMA DE PERÍODO PERSONALIZADO
*/

// Abrir modal de período personalizado
function openCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  // Definir data mínima como hoje
  const today = new Date().toISOString().split('T')[0];
  if (DOM.customStartDate) DOM.customStartDate.min = today;
  if (DOM.customEndDate) DOM.customEndDate.min = today;
  if (DOM.recurringStartDate) DOM.recurringStartDate.min = today;
  if (DOM.recurringEndDate) DOM.recurringEndDate.min = today;

  // Limpar formulário
  if (DOM.customPeriodForm) DOM.customPeriodForm.reset();

  // Inicializar valores padrão
  if (DOM.customStartDate) DOM.customStartDate.value = today;
  if (DOM.customEndDate) DOM.customEndDate.value = today;
  if (DOM.recurringStartDate) DOM.recurringStartDate.value = today;

  // Inicializar dias da semana (segunda a sexta selecionados por padrão)
  const weekdayCheckboxes = document.querySelectorAll('.weekday-option input[type="checkbox"]');
  weekdayCheckboxes.forEach((checkbox, index) => {
    checkbox.checked = index >= 1 && index <= 5;
  });

  // Mostrar seção padrão (intervalo)
  showPeriodSection('range');

  // Inicializar estados dos campos
  updateIntervalUnit();
  toggleRecurringEndFields();

  // Abrir modal
  if (DOM.modalCustomPeriod.showModal) {
    DOM.modalCustomPeriod.showModal();
  }

  if (DOM.customTitle) DOM.customTitle.focus();
}

// Função para fechar o modal de período personalizado
function closeCustomPeriodModal() {
  if (!DOM.modalCustomPeriod) return;

  if (DOM.customPeriodForm) DOM.customPeriodForm.reset();

  if (DOM.specificDatesContainer) {
    DOM.specificDatesContainer.innerHTML = '';
  }

  if (DOM.modalCustomPeriod.close) DOM.modalCustomPeriod.close();
}

// Mostrar seção específica baseada no tipo de período selecionado
function showPeriodSection(type) {
  if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'none';
  if (DOM.periodSpecificSection) DOM.periodSpecificSection.style.display = 'none';
  if (DOM.periodRecurringSection) DOM.periodRecurringSection.style.display = 'none';

  switch (type) {
    case 'range':
      if (DOM.periodRangeSection) DOM.periodRangeSection.style.display = 'block';
      break;
    case 'specific':
      if (DOM.periodSpecificSection) {
        DOM.periodSpecificSection.style.display = 'block';
        if (!DOM.specificDatesContainer.querySelector('.specific-date')) {
          addSpecificDateField();
        }
      }
      break;
    case 'recurring':
      if (DOM.periodRecurringSection) {
        DOM.periodRecurringSection.style.display = 'block';
        const today = new Date().toISOString().split('T')[0];
        if (DOM.recurringStartDate) DOM.recurringStartDate.min = today;
        if (DOM.recurringEndDate) DOM.recurringEndDate.min = today;
      }
      break;
  }
}

// Adicionar campo de data para dias específicos
function addSpecificDateField() {
  if (!DOM.specificDatesContainer) return;

  const dateRow = document.createElement('div');
  dateRow.className = 'date-input-row';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'specific-date';
  dateInput.required = true;

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn icon only remove-date';
  removeBtn.setAttribute('aria-label', 'Remover data');
  removeBtn.textContent = '✕';

  removeBtn.addEventListener('click', function () {
    dateRow.remove();
    if (DOM.specificDatesContainer.children.length === 0) {
      addSpecificDateField();
    }
  });

  dateRow.appendChild(dateInput);
  dateRow.appendChild(removeBtn);
  DOM.specificDatesContainer.appendChild(dateRow);

  setTimeout(() => dateInput.focus(), 100);
}

// Atualizar unidade de intervalo baseada na frequência
function updateIntervalUnit() {
  if (!DOM.recurringFrequency || !DOM.intervalUnit) return;

  const frequency = DOM.recurringFrequency.value;
  const lang = getLang();
  let unit = t('frequency.daily');

  switch (frequency) {
    case 'weekly':
      unit = t('frequency.weekly');
      break;
    case 'monthly':
      unit = t('frequency.monthly');
      break;
  }

  DOM.intervalUnit.textContent = unit;
}

// Habilitar/desabilitar campos de término baseado na seleção
function toggleRecurringEndFields() {
  const selectedRadio = document.querySelector('input[name="recurringEnd"]:checked');
  if (!selectedRadio) return;

  const selectedValue = selectedRadio.value;

  if (DOM.recurringOccurrences) {
    DOM.recurringOccurrences.disabled = selectedValue !== 'after';
    if (!DOM.recurringOccurrences.value) {
      DOM.recurringOccurrences.value = '10';
    }
  }

  if (DOM.recurringEndDate) {
    DOM.recurringEndDate.disabled = selectedValue !== 'on';
    if (!DOM.recurringEndDate.value && selectedValue === 'on') {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      DOM.recurringEndDate.value = today.toISOString().split('T')[0];
    }
  }
}

// Gerar todas as datas para uma rotina baseada no tipo de período
function generateRoutineDates(periodType, formData) {
  let dates = [];

  try {
    switch (periodType) {
      case 'range':
        if (!formData.startDate || !formData.endDate) {
          throw new Error('Datas de início e término são obrigatórias');
        }

        const start = new Date(formData.startDate + 'T00:00:00');
        const end = new Date(formData.endDate + 'T00:00:00');

        if (start > end) {
          throw new Error('Data de início não pode ser posterior à data de término');
        }

        const selectedDays = formData.selectedDays && formData.selectedDays.length > 0
          ? formData.selectedDays
          : [1, 2, 3, 4, 5];

        let current = new Date(start);
        while (current <= end) {
          if (selectedDays.includes(current.getDay())) {
            dates.push(formatDateForInput(current));
          }
          current.setDate(current.getDate() + 1);

          if (dates.length > 365) break;
        }
        break;

      case 'specific':
        if (!formData.specificDates || formData.specificDates.length === 0) {
          throw new Error('Pelo menos uma data específica é obrigatória');
        }

        dates = formData.specificDates
          .filter(date => date && date.trim() !== '')
          .map(date => {
            const dateObj = new Date(date + 'T00:00:00');
            if (isNaN(dateObj.getTime())) {
              throw new Error(`Data inválida: ${date}`);
            }
            return formatDateForInput(dateObj);
          })
          .filter((date, index, self) => self.indexOf(date) === index);
        break;

      case 'recurring':
        dates = generateRecurringDates(formData);
        break;

      default:
        throw new Error('Tipo de período desconhecido');
    }
  } catch (error) {
    console.error('Erro ao gerar datas:', error);
    showToast(error.message, 'error');
    return [];
  }

  return dates;
}

// Gerar datas para rotinas recorrentes
function generateRecurringDates(formData) {
  const dates = [];

  if (!formData.startDate) {
    throw new Error('Data de início é obrigatória');
  }

  const startDate = new Date(formData.startDate + 'T00:00:00');
  const frequency = formData.frequency || 'weekly';
  const interval = parseInt(formData.interval) || 1;

  if (interval < 1) {
    throw new Error('Intervalo deve ser pelo menos 1');
  }

  let currentDate = new Date(startDate);
  let occurrenceCount = 0;

  const maxOccurrences = formData.endType === 'after' ? parseInt(formData.occurrences) || 10 : Infinity;
  const endDate = formData.endType === 'on' && formData.endDate
    ? new Date(formData.endDate + 'T00:00:00')
    : null;

  if (endDate && startDate > endDate) {
    throw new Error('Data de início não pode ser posterior à data de término');
  }

  while (occurrenceCount < 365) {
    if (formData.endType === 'after' && occurrenceCount >= maxOccurrences) {
      break;
    }
    if (formData.endType === 'on' && currentDate > endDate) {
      break;
    }

    dates.push(formatDateForInput(currentDate));
    occurrenceCount++;

    switch (frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(0);
        if (currentDate.getDate() > nextMonth.getDate()) {
          currentDate.setDate(nextMonth.getDate());
        }
        break;
    }

    if (occurrenceCount >= 365) break;
  }

  return dates;
}

// Adicionar múltiplas rotinas baseadas nas datas geradas
function addRoutinesWithCustomPeriod(formData) {
  try {
    const dates = generateRoutineDates(formData.periodType, formData);

    if (dates.length === 0) {
      showToast('Nenhuma data válida foi gerada para esta rotina.', 'error');
      return;
    }

    if (dates.length > 50) {
      const confirmed = confirm(`Esta ação criará ${dates.length} rotinas. Isso pode afetar o desempenho. Deseja continuar?`);
      if (!confirmed) return;
    }

    let createdCount = 0;
    const errors = [];

    dates.forEach((date, index) => {
      try {
        const routineData = {
          title: formData.title + (dates.length > 1 ? ` (${index + 1}/${dates.length})` : ''),
          description: formData.description,
          date: date,
          time: formData.time,
          priority: formData.priority,
          tag: formData.tag,
          status: 'todo',
          completed: false,
          isRecurring: formData.periodType === 'recurring'
        };

        const result = addNewRoutine(routineData);
        if (result) createdCount++;
      } catch (error) {
        errors.push(`Erro na data ${date}: ${error.message}`);
      }
    });

    if (errors.length > 0) {
      console.error('Erros ao criar rotinas:', errors);
      showToast(`${createdCount} rotina(s) criada(s), ${errors.length} com erro.`, 'warning');
    } else {
      const lang = getLang();
      const successMessages = {
        'pt-BR': `${createdCount} rotina(s) criada(s) com sucesso!`,
        'en-US': `${createdCount} routine(s) created successfully!`,
        'es-ES': `¡${createdCount} rutina(s) creada(s) con éxito!`,
        'fr-FR': `${createdCount} routine(s) créée(s) avec succès !`
      };
      showToast(successMessages[lang] || successMessages['pt-BR'], 'success');
    }
  } catch (error) {
    console.error('Erro ao adicionar rotinas:', error);
    showToast('Erro ao criar rotinas: ' + error.message, 'error');
  }
}

// Processar formulário de período personalizado
function processCustomPeriodForm(e) {
  if (e && e.preventDefault) e.preventDefault();

  const submitter = e.submitter;
  if (submitter && submitter.value === 'cancel') {
    closeCustomPeriodModal();
    return;
  }

  const title = DOM.customTitle ? DOM.customTitle.value.trim() : '';
  const description = DOM.customDesc ? DOM.customDesc.value : '';
  const time = DOM.customTime ? DOM.customTime.value || undefined : undefined;
  const priority = DOM.customPriority ? DOM.customPriority.value : 'medium';
  const tag = DOM.customTag ? normalizeTag(DOM.customTag.value) : undefined;

  if (!title) {
    showToastTranslation('toast.requiredTitle', 'error');
    return;
  }

  const periodTypeRadio = document.querySelector('input[name="periodType"]:checked');
  if (!periodTypeRadio) {
    showToast('Selecione um tipo de período.', 'error');
    return;
  }

  const periodType = periodTypeRadio.value;
  let formData = {
    title,
    description,
    time,
    priority,
    tag,
    periodType
  };

  try {
    switch (periodType) {
      case 'range':
        const startDate = DOM.customStartDate ? DOM.customStartDate.value : '';
        const endDate = DOM.customEndDate ? DOM.customEndDate.value : '';

        if (!startDate || !endDate) {
          showToast('As datas de início e término são obrigatórias.', 'error');
          return;
        }

        const selectedDays = [];
        document.querySelectorAll('.weekday-option input[type="checkbox"]:checked').forEach(cb => {
          selectedDays.push(parseInt(cb.value));
        });

        formData.startDate = startDate;
        formData.endDate = endDate;
        formData.selectedDays = selectedDays;
        break;

      case 'specific':
        const specificDates = [];
        document.querySelectorAll('.specific-date').forEach(input => {
          if (input.value) specificDates.push(input.value);
        });

        if (specificDates.length === 0) {
          showToast('Pelo menos uma data específica deve ser fornecida.', 'error');
          return;
        }

        formData.specificDates = specificDates;
        break;

      case 'recurring':
        const recurringStartDate = DOM.recurringStartDate ? DOM.recurringStartDate.value : '';
        const frequency = DOM.recurringFrequency ? DOM.recurringFrequency.value : 'weekly';
        const interval = DOM.recurringInterval ? parseInt(DOM.recurringInterval.value) : 1;
        const endTypeRadio = document.querySelector('input[name="recurringEnd"]:checked');

        if (!endTypeRadio) {
          showToast('Selecione uma opção de término.', 'error');
          return;
        }

        const endType = endTypeRadio.value;

        if (!recurringStartDate) {
          showToast('A data de início é obrigatória para rotinas recorrentes.', 'error');
          return;
        }

        if (interval < 1) {
          showToast('O intervalo deve ser pelo menos 1.', 'error');
          return;
        }

        formData.startDate = recurringStartDate;
        formData.frequency = frequency;
        formData.interval = interval;
        formData.endType = endType;

        if (endType === 'after') {
          const occurrences = DOM.recurringOccurrences ? parseInt(DOM.recurringOccurrences.value) : 10;
          if (occurrences < 1) {
            showToast('O número de ocorrências deve ser pelo menos 1.', 'error');
            return;
          }
          formData.occurrences = occurrences;
        } else if (endType === 'on') {
          const endDate = DOM.recurringEndDate ? DOM.recurringEndDate.value : '';
          if (!endDate) {
            showToast('A data de término é obrigatória quando selecionada.', 'error');
            return;
          }
          formData.endDate = endDate;
        }
        break;
    }

    addRoutinesWithCustomPeriod(formData);
    closeCustomPeriodModal();

  } catch (error) {
    console.error('Erro no processamento do formulário:', error);
    showToast('Erro: ' + error.message, 'error');
  }
}

/*
   16) SISTEMA DE NOTIFICAÇÕES
*/

// Configurar notificações
function setupNotifications() {
  if (!('Notification' in window)) {
    console.log('Este navegador não suporta notificações');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.disabled = true;
      DOM.notificationsToggle.checked = false;
    }
    return;
  }

  if (Notification.permission === 'granted') {
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = true;
    }
  } else if (Notification.permission === 'denied') {
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
      DOM.notificationsToggle.disabled = true;
    }
  }
}

// Função para solicitar permissão de notificação
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast(t('notification.unsupported'), 'error');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    showToast(t('notification.permissionDenied'), 'error');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
    }
    return false;
  }

  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    showToast('Notificações ativadas com sucesso!', 'success');
    return true;
  } else {
    showToast(t('notification.permissionDenied'), 'error');
    if (DOM.notificationsToggle) {
      DOM.notificationsToggle.checked = false;
    }
    return false;
  }
}

// Função para enviar notificação de exemplo
function sendTestNotification() {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification('Life Build', {
    body: t('notification.test'),
    icon: 'img/Ryo.jpg',
    badge: 'img/Ryo.jpg'
  });

  notification.onclick = function () {
    window.focus();
    notification.close();
  };
}

// Configurar evento específico para o toggle de notificações
function setupNotificationToggle() {
  if (DOM.notificationsToggle) {
    DOM.notificationsToggle.addEventListener('change', function () {
      if (this.checked) {
        requestNotificationPermission().then(permissionGranted => {
          if (!permissionGranted) {
            this.checked = false;
          } else {
            setTimeout(sendTestNotification, 1000);
          }
        });
      }
    });
  }
}

// Função para enviar notificações de lembretes
function sendReminderNotification(task) {
  if (!state.preferences.notifications || !('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const now = new Date();
  const taskTime = task.time ? new Date(`${task.date}T${task.time}`) : new Date(`${task.date}T09:00:00`);

  if (task.date === now.toISOString().split('T')[0]) {
    const timeDiff = taskTime.getTime() - now.getTime();

    if (timeDiff <= 15 * 60 * 1000 && timeDiff > -60 * 60 * 1000) {
      const notification = new Notification('Life Build', {
        body: `${t('notification.reminder')}"${task.title}" - ${task.time || t('filter.hoje')}`,
        icon: 'img/Ryo.jpg',
        tag: task.id
      });

      notification.onclick = function () {
        window.focus();
        openTaskDetails(task.id);
        notification.close();
      };
    }
  }
}

/*
   17) SISTEMA DE TROCA DE FOTO DO PERFIL
*/

// Configurar evento para trocar foto do perfil (clique na foto)
function setupProfilePhotoChange() {
  if (DOM.profilePhoto && DOM.profilePhotoInput) {
    DOM.profilePhoto.addEventListener('click', () => {
      DOM.profilePhotoInput.click();
    });

    DOM.profilePhotoInput.addEventListener('change', handleProfilePhotoChange);
  }
}

// Configurar evento para o botão de alterar foto
function setupPhotoChangeButton() {
  if (DOM.changePhotoBtn && DOM.profilePhotoInput) {
    DOM.changePhotoBtn.addEventListener('click', () => {
      DOM.profilePhotoInput.click();
    });
  }
}

// Processar a troca da foto do perfil
function handleProfilePhotoChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Por favor, selecione uma imagem válida.', 'error');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast('A imagem deve ter no máximo 5MB.', 'error');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    updateProfilePhoto(e.target.result);
  };

  reader.onerror = function () {
    showToast('Erro ao carregar a imagem.', 'error');
  };

  reader.readAsDataURL(file);
}

// Atualizar a foto do perfil no estado e na interface
function updateProfilePhoto(imageData) {
  if (!state.profile) state.profile = {};
  state.profile.photo = imageData;

  const profilePhoto = document.getElementById('profilePhoto');
  const topbarAvatar = document.querySelector('.topbar .avatar img');

  if (profilePhoto) {
    profilePhoto.src = imageData;
  }

  if (topbarAvatar) {
    topbarAvatar.src = imageData;
  }

  saveData();

  showToastTranslation('toast.saved', 'success');
}

// Carregar foto do perfil salva
function loadProfilePhoto() {
  if (state.profile && state.profile.photo) {
    const profilePhoto = document.getElementById('profilePhoto');
    const topbarAvatar = document.querySelector('.topbar .avatar img');

    if (profilePhoto) {
      profilePhoto.src = state.profile.photo;
    }

    if (topbarAvatar) {
      topbarAvatar.src = state.profile.photo;
    }
  }
}

/*
   18) EVENTOS GERAIS E LIGAÇÕES - COM CORREÇÕES DO SISTEMA DE FONTE
*/

// Configura todos os listeners de UI (botões, formulários, links, etc.)
function setupEventListeners() {
  // Toggle sidebar
  if (DOM.btnToggleSidebar) DOM.btnToggleSidebar.addEventListener('click', toggleSidebar);

  // Botão de adicionar rápida
  if (DOM.btnQuickAdd) {
    DOM.btnQuickAdd.addEventListener('click', openCustomPeriodModal);
  }

  // Navegação principal (links com data-view)
  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        setCurrentView(view);
      });
    });
  }

  // Filtros rápidos (data-filter)
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const wasActive = link.classList.contains('is-active');

        DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
        const allTags = document.querySelectorAll('.tag');
        allTags.forEach(tag => tag.classList.remove('is-active'));

        if (!wasActive) {
          link.classList.add('is-active');
        }

        render();

        if (!wasActive) {
          const filter = link.dataset.filter;
          const lang = getLang();
          const filterNames = {
            'pendentes': t('filter.pendentes'),
            'concluidas': t('filter.concluidas'),
            'alta': t('filter.alta'),
            'media': t('filter.media'),
            'baixa': t('filter.baixa'),
            'semData': t('filter.semData')
          };

          const filterMessages = {
            'pt-BR': `Filtrado por: ${filterNames[filter]}`,
            'en-US': `Filtered by: ${filterNames[filter]}`,
            'es-ES': `Filtrado por: ${filterNames[filter]}`,
            'fr-FR': `Filtré par: ${filterNames[filter]}`
          };

          showToast(filterMessages[lang] || filterMessages['pt-BR'], 'info');
        }
      });
    });
  }

  // Modal adicionar tag
  if (DOM.btnAddTag) {
    DOM.btnAddTag.addEventListener('click', openAddTagModal);
  }

  // Formulário de adicionar tag
  const addTagForm = document.getElementById('addTagForm');
  if (addTagForm) {
    addTagForm.addEventListener('submit', processAddTagForm);

    const cancelBtn = addTagForm.querySelector('button[value="cancel"]');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAddTagModal();
      });
    }
  }

  // Fechar painel detalhes
  if (DOM.detailsClose) DOM.detailsClose.addEventListener('click', closeDetails);

  // Submit do formulário de detalhes (salvar)
  if (DOM.detailsForm) DOM.detailsForm.addEventListener('submit', saveTaskDetails);

  // Botões excluir e duplicar no painel de detalhes
  if (DOM.btnDeleteTask) DOM.btnDeleteTask.addEventListener('click', deleteCurrentTask);
  if (DOM.btnDuplicateTask) DOM.btnDuplicateTask.addEventListener('click', duplicateCurrentTask);

  // Event listeners para o modal de período personalizado
  if (DOM.periodTypeRadios) {
    DOM.periodTypeRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        showPeriodSection(this.value);
      });
    });
  }

  if (DOM.addDateBtn) {
    DOM.addDateBtn.addEventListener('click', addSpecificDateField);
  }

  if (DOM.recurringFrequency) {
    DOM.recurringFrequency.addEventListener('change', updateIntervalUnit);
  }

  if (DOM.recurringEndRadios) {
    DOM.recurringEndRadios.forEach(radio => {
      radio.addEventListener('change', toggleRecurringEndFields);
    });
  }

  if (DOM.customPeriodForm) {
    DOM.customPeriodForm.addEventListener('submit', processCustomPeriodForm);

    const cancelBtn = DOM.customPeriodForm.querySelector('button[value="cancel"]');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closeCustomPeriodModal();
      });
    }
  }

  // Navegação do calendário (mudar mês)
  if (DOM.calPrev) DOM.calPrev.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });
  if (DOM.calNext) DOM.calNext.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Configurações
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener('change', toggleTheme);
  }

  if (DOM.btnSaveSettings) {
    DOM.btnSaveSettings.addEventListener('click', saveSettings);
  }

  if (DOM.btnResetSettings) {
    DOM.btnResetSettings.addEventListener('click', resetSettings);
  }

  if (DOM.btnOpenConfig) {
    DOM.btnOpenConfig.addEventListener('click', (e) => {
      e.preventDefault();
      setCurrentView('config');
    });
  }

  // Controle de idioma
  if (DOM.appLanguage) {
    DOM.appLanguage.addEventListener('change', e => {
      changeLanguage(e.target.value);
    });
  }

  // CONTROLES DE CONFIGURAÇÃO EM TEMPO REAL - ATUALIZADOS
  if (DOM.fontSize) {
    DOM.fontSize.addEventListener('input', (e) => {
      // APLICAR AO ELEMENTO HTML (RAIZ) PARA AFETAR TODO O SITE
      document.documentElement.style.fontSize = e.target.value + 'px';
      if (DOM.fontSizeValue) DOM.fontSizeValue.textContent = e.target.value + 'px';
    });
  }

  if (DOM.fontFamily) {
    DOM.fontFamily.addEventListener('change', (e) => {
      // APLICAR AO ELEMENTO HTML (RAIZ) PARA AFETAR TODO O SITE
      document.documentElement.style.fontFamily = e.target.value;
    });
  }

  // Perfil
  if (DOM.showEmail) {
    DOM.showEmail.addEventListener('click', (e) => {
      e.preventDefault();
      if (DOM.userEmail.textContent.includes('*')) {
        DOM.userEmail.textContent = state.profile.email;
        DOM.showEmail.textContent = t('profile.ocultar');
      } else {
        DOM.userEmail.textContent = '*****************@gmail.com';
        DOM.showEmail.textContent = t('profile.mostrar');
      }
    });
  }

  // Botões de edição do perfil
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const field = e.target.dataset.edit;
      const currentValue = state.profile[field];
      const newValue = prompt(`Editar ${field}:`, currentValue);
      if (newValue && newValue.trim()) {
        state.profile[field] = newValue.trim();
        saveData();
        renderProfile();
        showToast(`${field} atualizado com sucesso!`, 'success');
      }
    });
  });

  // Fechar modal de etiqueta com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const tagModal = document.getElementById('modalAddTag');
      if (tagModal && tagModal.open) {
        closeAddTagModal();
      }
    }
  });
}

/* 
   19) FUNÇÕES AUXILIARES (UI/Helpers)
*/

// Alterna la sidebar visível / escondida e persiste a preferência
function toggleSidebar() {
  state.showSidebar = !state.showSidebar;
  if (DOM.app) DOM.app.setAttribute('data-layout', state.showSidebar ? 'with-sidebar' : 'without-sidebar');
  saveData();
}

// Muda a view principal (Hoje / Semana / Calendário / Todas / Config)
function setCurrentView(view) {
  const v = (view || 'hoje').toString();
  state.currentView = v;

  // Atualizar atributo data-view no app
  DOM.app.setAttribute('data-view', v);

  if (DOM.menuLinks && DOM.menuLinks.length) {
    DOM.menuLinks.forEach(link => {
      const linkView = (link.dataset.view || '').toString();
      link.classList.toggle('is-active', linkView.toLowerCase() === String(state.currentView).toLowerCase());
    });
  }

  // Limpar filtros ativos ao mudar de view
  if (DOM.filterLinks && DOM.filterLinks.length) {
    DOM.filterLinks.forEach(l => l.classList.remove('is-active'));
  }

  const allTags = document.querySelectorAll('.tag');
  allTags.forEach(tag => tag.classList.remove('is-active'));

  // Atualizar visibilidade dos filtros
  updateFiltersVisibility();

  render();
}

// Atualiza relógio e data na UI
function updateClock() {
  const now = new Date();
  const lang = getLang();
  if (DOM.todayDate) DOM.todayDate.textContent = now.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
  if (DOM.nowTime) DOM.nowTime.textContent = now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
}

// Atualiza indicadores visuais de filtros ativos
function updateFilterIndicators() {
  const activeFilter = document.querySelector('.menu-link[data-filter].is-active');
  const activeTag = document.querySelector('.tag.is-active');

  if (activeFilter || activeTag) {
    DOM.app.classList.add('has-active-filter');
  } else {
    DOM.app.classList.remove('has-active-filter');
  }
}

/*
   20) SISTEMA DE GRÁFICOS - ATUALIZADO COM NOVO GRÁFICO DE USO DE ETIQUETAS
*/

// Inicializar todos os gráficos
function initCharts() {
  console.log('Inicializando gráficos para view:', state.currentView);

  // Só inicializar gráficos se estiver na view correta
  if (state.currentView !== 'graficos') {
    console.log('Não é a view de gráficos, ignorando...');
    return;
  }

  if (!state.routines || state.routines.length === 0) {
    console.log('Nenhuma rotina encontrada para gráficos');
    renderEmptyCharts();
    return;
  }

  try {
    // Aguardar o DOM estar pronto
    setTimeout(() => {
      renderWeeklyProgressChart();
      renderTimeDistributionChart();
      renderHabitsOverTimeChart();
      renderTagUsageChart(); // NOVO GRÁFICO ADICIONADO AQUI
      console.log('Gráficos inicializados com sucesso!');
    }, 100);
  } catch (error) {
    console.error('Erro ao inicializar gráficos:', error);
    renderEmptyCharts();
  }
}

// Obter dados para o gráfico de uso de etiquetas
function getTagUsageData() {
  const tagStats = {};

  // Contar uso de cada etiqueta
  state.routines.forEach(task => {
    const tag = task.tag || 'sem-etiqueta';
    if (!tagStats[tag]) {
      tagStats[tag] = {
        count: 0,
        completed: 0,
        color: getTagColor(tag)
      };
    }
    tagStats[tag].count++;
    if (task.completed) {
      tagStats[tag].completed++;
    }
  });

  // Ordenar por quantidade (mais usadas primeiro) e limitar a top 8
  const sortedTags = Object.entries(tagStats)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 8);

  return {
    labels: sortedTags.map(([tag]) => tag === 'sem-etiqueta' ? t('tag.geral') : `#${tag}`),
    data: sortedTags.map(([, stats]) => stats.count),
    completed: sortedTags.map(([, stats]) => stats.completed),
    colors: sortedTags.map(([, stats]) => stats.color),
    rawTags: sortedTags.map(([tag]) => tag)
  };
}

// Função auxiliar para obter cor da etiqueta
function getTagColor(tagName) {
  if (tagName === 'sem-etiqueta') return '#9ca3af'; // Cinza para sem etiqueta

  const tagInfo = state.tags.find(t => t.name === tagName);
  return tagInfo ? tagInfo.color : '#4f46e5'; // Cor padrão
}

// Obter dados reais para o gráfico de progresso semanal
function getWeeklyProgressData() {
  const last7Days = [];
  const today = new Date();

  // Gerar array dos últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    last7Days.push(date.toISOString().split('T')[0]);
  }

  // Contar tarefas concluídas por dia
  const completedByDay = last7Days.map(date => {
    return state.routines.filter(task =>
      task.date === date && task.completed
    ).length;
  });

  return completedByDay;
}

// Obter dados reais para distribuição de tempo por etiquetas
function getTimeDistributionData() {
  const tagStats = {};

  state.routines.forEach(task => {
    const tag = task.tag || 'sem-etiqueta';
    if (!tagStats[tag]) {
      tagStats[tag] = {
        count: 0,
        completed: 0
      };
    }
    tagStats[tag].count++;
    if (task.completed) {
      tagStats[tag].completed++;
    }
  });

  // Ordenar por quantidade (mais frequentes primeiro)
  const sortedTags = Object.entries(tagStats)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5); // Top 5 etiquetas

  return {
    labels: sortedTags.map(([tag]) => tag === 'sem-etiqueta' ? t('tag.geral') : `#${tag}`),
    data: sortedTags.map(([, stats]) => stats.count),
    completed: sortedTags.map(([, stats]) => stats.completed)
  };
}

// Obter dados reais para evolução de hábitos
function getHabitsOverTimeData() {
  const last30Days = [];
  const today = new Date();

  // Gerar array dos últimos 30 dias
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    last30Days.push(date.toISOString().split('T')[0]);
  }

  // Calcular taxa de conclusão diária (média móvel de 7 dias)
  const completionRates = [];

  for (let i = 0; i < last30Days.length; i++) {
    const startIdx = Math.max(0, i - 6);
    const endIdx = i;
    const periodDays = last30Days.slice(startIdx, endIdx + 1);

    let totalTasks = 0;
    let completedTasks = 0;

    periodDays.forEach(date => {
      const dayTasks = state.routines.filter(task => task.date === date);
      totalTasks += dayTasks.length;
      completedTasks += dayTasks.filter(task => task.completed).length;
    });

    const rate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    completionRates.push(Math.round(rate));
  }

  return {
    labels: last30Days.map(date => {
      const d = new Date(date);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    }),
    data: completionRates
  };
}

// Obter cores para as etiquetas
function getTagColors(tags) {
  const defaultColors = ['#ff5454', '#4f46e5', '#10b981', '#f59e0b', '#8b5cf6'];
  const tagColors = {};

  tags.forEach((tag, index) => {
    const tagInfo = state.tags.find(t => t.name === tag.replace('#', ''));
    tagColors[tag] = tagInfo ? tagInfo.color : defaultColors[index % defaultColors.length];
  });

  return tagColors;
}

// Renderizar gráfico de progresso semanal ATUALIZADO
function renderWeeklyProgressChart() {
  const ctx = document.getElementById('weeklyProgressChart');
  if (!ctx) {
    console.log('Elemento weeklyProgressChart não encontrado');
    return;
  }

  // Destruir instância anterior se existir
  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const weeklyData = getWeeklyProgressData();
  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: I18N.weekdays[lang],
      datasets: [{
        label: t('chart.weeklyProgress'),
        data: weeklyData,
        backgroundColor: '#ff5454',
        borderColor: '#ff2c2c',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} tarefas concluídas`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tarefas Concluídas'
          },
          ticks: {
            stepSize: 1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Dias da Semana'
          }
        }
      }
    }
  });

  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoWeekly');
  }
}

// Renderizar gráfico de distribuição de tempo ATUALIZADO
function renderTimeDistributionChart() {
  const ctx = document.getElementById('timeDistributionChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const distributionData = getTimeDistributionData();
  const lang = getLang();
  const tagColors = getTagColors(distributionData.labels);

  ctx.chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: distributionData.labels,
      datasets: [{
        data: distributionData.data,
        backgroundColor: distributionData.labels.map(tag => tagColors[tag]),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} tarefas (${percentage}%)`;
            }
          }
        }
      },
      cutout: '60%'
    }
  });

  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoTime');
  }
}

// Renderizar gráfico de hábitos ao longo do tempo ATUALIZADO
function renderHabitsOverTimeChart() {
  const ctx = document.getElementById('habitsOverTimeChart');
  if (!ctx) return;

  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const habitsData = getHabitsOverTimeData();
  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: habitsData.labels,
      datasets: [{
        label: 'Taxa de Conclusão (%)',
        data: habitsData.data,
        borderColor: '#ff5454',
        backgroundColor: 'rgba(255, 84, 84, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ff5454',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Taxa de conclusão: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Taxa de Conclusão (%)'
          },
          ticks: {
            callback: function (value) {
              return value + '%';
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Data'
          },
          ticks: {
            maxTicksLimit: 10,
            callback: function (value, index) {
              // Mostrar apenas alguns rótulos para não sobrecarregar
              return index % 3 === 0 ? this.getLabelForValue(value) : '';
            }
          }
        }
      }
    }
  });

  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoHabits');
  }
}

// Renderizar gráfico de uso de etiquetas
function renderTagUsageChart() {
  const ctx = document.getElementById('tagUsageChart');
  if (!ctx) {
    console.log('Elemento tagUsageChart não encontrado');
    return;
  }

  // Destruir instância anterior se existir
  if (ctx.chartInstance) {
    ctx.chartInstance.destroy();
  }

  const tagUsageData = getTagUsageData();
  const lang = getLang();

  ctx.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tagUsageData.labels,
      datasets: [{
        label: 'Total de Rotinas',
        data: tagUsageData.data,
        backgroundColor: tagUsageData.colors,
        borderColor: tagUsageData.colors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }, {
        label: 'Concluídas',
        data: tagUsageData.completed,
        backgroundColor: tagUsageData.colors.map(color => color + '80'), // Mais transparente
        borderColor: tagUsageData.colors,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              const total = context.dataset.label === 'Total de Rotinas'
                ? tagUsageData.data[context.dataIndex]
                : tagUsageData.completed[context.dataIndex];

              if (context.dataset.label === 'Concluídas') {
                const totalRoutines = tagUsageData.data[context.dataIndex];
                const percentage = totalRoutines > 0
                  ? Math.round((value / totalRoutines) * 100)
                  : 0;
                return `${label}: ${value} de ${totalRoutines} (${percentage}%)`;
              }
              return `${label}: ${value} rotinas`;
            },
            afterLabel: function (context) {
              if (context.datasetIndex === 0) {
                const tagName = tagUsageData.rawTags[context.dataIndex];
                if (tagName !== 'sem-etiqueta') {
                  return `Clique para filtrar por #${tagName}`;
                }
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de Rotinas'
          },
          ticks: {
            stepSize: 1
          }
        },
        x: {
          title: {
            display: true,
            text: 'Etiquetas'
          }
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const elementIndex = elements[0].index;
          const tagName = tagUsageData.rawTags[elementIndex];

          if (tagName !== 'sem-etiqueta') {
            // Filtrar por esta etiqueta
            filterByTag(tagName);
            // Mudar para view "Todas as Rotinas" para ver o filtro aplicado
            setCurrentView('todasRotinas');

            const lang = getLang();
            const filterMessages = {
              'pt-BR': `Filtrado por #${tagName}`,
              'en-US': `Filtered by #${tagName}`,
              'es-ES': `Filtrado por #${tagName}`,
              'fr-FR': `Filtré par #${tagName}`
            };

            showToast(filterMessages[lang] || filterMessages['pt-BR'], 'info');
          }
        }
      }
    }
  });

  // Adicionar interatividade ao passar o mouse
  ctx.addEventListener('mousemove', function (event) {
    const points = ctx.chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (points.length > 0) {
      ctx.style.cursor = 'pointer';
    } else {
      ctx.style.cursor = 'default';
    }
  });

  const infoText = ctx.closest('.chart-container').querySelector('.info-text');
  if (infoText) {
    infoText.textContent = t('chart.infoTagUsage');
  }
}

// Renderizar gráficos vazios quando não há dados
function renderEmptyCharts() {
  const chartIds = [
    'weeklyProgressChart',
    'timeDistributionChart',
    'habitsOverTimeChart',
    'tagUsageChart' // NOVO GRÁFICO ADICIONADO AQUI
  ];

  chartIds.forEach(chartId => {
    const ctx = document.getElementById(chartId);
    if (ctx) {
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }

      const lang = getLang();

      ctx.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [t('empty.none')],
          datasets: [{
            label: t('empty.addRoutines'),
            data: [1],
            backgroundColor: '#e5e7eb'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, display: false },
            x: { display: false }
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });

      const infoText = ctx.closest('.chart-container').querySelector('.info-text');
      if (infoText) {
        infoText.textContent = t('empty.addRoutines');
      }
    }
  });
}

// Atualizar gráficos quando os dados mudarem
function updateCharts() {
  if (state.currentView === 'graficos') {
    initCharts();
  }
}

// Modificar a função saveData para atualizar gráficos quando necessário
const originalSaveData = saveData;
saveData = function () {
  originalSaveData();
  updateCharts();
};



/*
   21) CALENDÁRIO - COM SELEÇÃO DE DIAS E ABERTURA DE MODAL
*/
// NOVA FUNÇÃO: Criar elemento de dia do calendário com seleção
function createCalendarDay(day, isOtherMonth, isToday = false, fullDate = null, tasks = []) {
  const cell = document.createElement('div');
  cell.className = 'calendar-day';
  if (isOtherMonth) cell.classList.add('other-month');
  if (isToday) cell.classList.add('today');

  // Adicionar data-attribute para fácil identificação
  if (fullDate) {
    cell.dataset.date = formatDateForInput(fullDate);
    cell.dataset.fullDate = fullDate.toISOString();
  }

  // Número do dia
  const number = document.createElement('div');
  number.className = 'calendar-day-number';
  number.textContent = day;
  cell.appendChild(number);

  // Se fullDate é passado, queremos também colocar eventos desse dia
  if (fullDate && tasks) {
    // Busca tarefas cuja data corresponde ao fullDate DENTRO DAS TAREFAS JÁ FILTRADAS
    const tasksForDay = tasks.filter(task => {
      if (!task.date) return false;
      const taskDate = new Date(task.date + 'T00:00:00');
      return taskDate.getDate() === fullDate.getDate()
        && taskDate.getMonth() === fullDate.getMonth()
        && taskDate.getFullYear() === fullDate.getFullYear();
    });

    // Para cada tarefa, adiciona um botão/evento no dia
    tasksForDay.forEach(task => {
      const ev = document.createElement('button');
      ev.className = `calendar-event priority-${task.priority || 'medium'}`;
      ev.dataset.taskId = task.id;
      if (task.isRecurring || task.parentRoutineId) {
        ev.classList.add('has-multiple-dates');
      }
      ev.textContent = task.title.length > 30 ? task.title.slice(0, 27) + '...' : task.title;
      ev.addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskDetails(task.id);
      });
      cell.appendChild(ev);
    });
  }

  // Adicionar evento de clique no dia - APENAS SE FOR DO MÊS ATUAL
  if (!isOtherMonth) {
    cell.addEventListener('click', handleDayClick);

    // Adicionar efeito visual de hover
    cell.addEventListener('mouseenter', () => {
      cell.classList.add('hover');
    });

    cell.addEventListener('mouseleave', () => {
      cell.classList.remove('hover');
    });
  }

  return cell;
}

// NOVA FUNÇÃO: Lidar com clique no dia do calendário
function handleDayClick(e) {
  // Não fazer nada se clicar em um evento
  if (e.target && (e.target.matches('.calendar-event') || e.target.closest('.calendar-event'))) {
    return;
  }

  const cell = e.currentTarget;

  // Remover seleção de outros dias
  document.querySelectorAll('.calendar-day.selected').forEach(day => {
    day.classList.remove('selected');
  });

  // Adicionar seleção visual
  cell.classList.add('selected');

  // Obter a data do dia clicado
  const dateStr = cell.dataset.date;
  if (!dateStr) return;

  // Mostrar toast informativo
  const dateObj = new Date(dateStr + 'T12:00:00');
  const lang = getLang();
  const formattedDate = dateObj.toLocaleDateString(lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toastMessages = {
    'pt-BR': `Dia selecionado: ${formattedDate}. Abrindo formulário de nova rotina...`,
    'en-US': `Selected day: ${formattedDate}. Opening new routine form...`,
    'es-ES': `Día seleccionado: ${formattedDate}. Abriendo formulario de nueva rutina...`,
    'fr-FR': `Jour sélectionné: ${formattedDate}. Ouverture du formulaire de nouvelle routine...`
  };

  showToast(toastMessages[lang] || toastMessages['pt-BR'], 'info', 2000);

  // Abrir modal de nova rotina com a data preenchida
  setTimeout(() => {
    openCustomPeriodModalWithDate(dateStr);
  }, 500);
}

// NOVA FUNÇÃO: Abrir modal com data específica
function openCustomPeriodModalWithDate(dateStr) {
  if (!DOM.modalCustomPeriod) return;

  // Abrir modal
  openCustomPeriodModal();

  // Pequeno delay para garantir que o modal esteja aberto
  setTimeout(() => {
    // Definir a data nos campos apropriados
    if (DOM.customStartDate) {
      DOM.customStartDate.value = dateStr;
    }
    if (DOM.customEndDate) {
      DOM.customEndDate.value = dateStr;
    }
    if (DOM.recurringStartDate) {
      DOM.recurringStartDate.value = dateStr;
    }

    // Para dias específicos, adicionar esta data
    const periodTypeRadio = document.querySelector('input[name="periodType"]:checked');
    if (periodTypeRadio && periodTypeRadio.value === 'specific') {
      // Limpar datas existentes
      DOM.specificDatesContainer.innerHTML = '';

      // Adicionar esta data
      addSpecificDateFieldWithValue(dateStr);
    }

    // Focar no título
    if (DOM.customTitle) {
      DOM.customTitle.focus();
    }
  }, 100);
}

// NOVA FUNÇÃO: Adicionar campo de data específica com valor predefinido
function addSpecificDateFieldWithValue(dateValue) {
  if (!DOM.specificDatesContainer) return;

  const dateRow = document.createElement('div');
  dateRow.className = 'date-input-row';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'specific-date';
  dateInput.value = dateValue;
  dateInput.required = true;

  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn icon only remove-date';
  removeBtn.setAttribute('aria-label', 'Remover data');
  removeBtn.textContent = '✕';

  removeBtn.addEventListener('click', function () {
    dateRow.remove();
    if (DOM.specificDatesContainer.children.length === 0) {
      addSpecificDateFieldWithValue(today);
    }
  });

  dateRow.appendChild(dateInput);
  dateRow.appendChild(removeBtn);
  DOM.specificDatesContainer.appendChild(dateRow);
}

// Adicionar esta função ao init()
function addCalendarStyles() {
  // Verificar se o estilo já foi adicionado
  if (document.getElementById('calendar-custom-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'calendar-custom-styles';
  style.textContent = `
    .calendar-day {
      position: relative;
      transition: all 0.2s ease;
      cursor: default;
    }
    
    .calendar-day:not(.other-month) {
      cursor: pointer;
    }
    
    .calendar-day.selected {
      background-color: rgba(79, 70, 229, 0.15) !important;
      border: 2px solid #4f46e5 !important;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
      transform: translateY(-1px);
    }
    
    .calendar-day.selected .calendar-day-number {
      font-weight: 700;
      color: #4f46e5;
      font-size: 1.1em;
    }
    
    .calendar-day.hover:not(.other-month) {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.1);
    }
    
    .calendar-day.today.selected {
      background-color: rgba(79, 70, 229, 0.25) !important;
    }
    
    .calendar-day.today.selected .calendar-day-number {
      color: #4f46e5;
    }
    
    /* Estilo para tema escuro */
    [data-theme="dark"] .calendar-day.hover:not(.other-month) {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    [data-theme="dark"] .calendar-day.selected {
      background-color: rgba(99, 102, 241, 0.2) !important;
      border-color: #6366f1 !important;
    }
    
    [data-theme="dark"] .calendar-day.selected .calendar-day-number {
      color: #a5b4fc;
    }
    
    [data-theme="dark"] .calendar-day.today.selected {
      background-color: rgba(99, 102, 241, 0.3) !important;
    }
    
    /* Indicador visual para dias com eventos */
    .calendar-day.has-events::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #4f46e5;
    }
    
    [data-theme="dark"] .calendar-day.has-events::after {
      background-color: #818cf8;
    }
  `;
  document.head.appendChild(style);
}




/*
   22) INICIALIZAÇÃO DA APLICAÇÃO
*/

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', init);