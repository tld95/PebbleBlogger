#include <pebble.h>

static char blogEntry[1024];
static DictationSession *dict;
static DictionaryIterator *itr;
static Window *window;


static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
  APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed!");
}

static void outbox_sent_callback(DictionaryIterator *iterator, void *context) {
  APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}

static void dictation_session_callback(DictationSession *session, DictationSessionStatus status, char *transcription, void  *context) {
	if (status == DictationSessionStatusSuccess) {
		snprintf(blogEntry, sizeof(blogEntry), "%s", transcription);

		uint32_t key = 1;
		app_message_outbox_begin(&itr);
		dict_write_cstring(itr, key, blogEntry);
		app_message_outbox_send();
	}
}

static void window_load(Window *window) {}

static void window_unload(Window *window) {}

static void init(void) {
	window = window_create();
	window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  	});

	dict = dictation_session_create(sizeof(blogEntry),
 		dictation_session_callback, NULL);

	window_stack_push(window, true);

	app_message_register_outbox_failed(outbox_failed_callback);
	app_message_register_outbox_sent(outbox_sent_callback);
	
	app_message_open(1024, 1024); 
	
	dictation_session_start(dict);
}

static void deinit(void) {
	dictation_session_destroy(dict);
	window_destroy(window);
}


int main(void) {
	init();	
	app_event_loop();
	deinit();
}
