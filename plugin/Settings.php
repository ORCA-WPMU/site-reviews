<?php

/**
 * @package   GeminiLabs\SiteReviews
 * @copyright Copyright (c) 2016, Paul Ryley
 * @license   GPLv2 or later
 * @since     1.0.0
 * -------------------------------------------------------------------------------------------------
 */

namespace GeminiLabs\SiteReviews;

use GeminiLabs\SiteReviews\App;
use ReflectionClass;
use ReflectionMethod;

class Settings
{
	/**
	 * @var App
	 */
	protected $app;

	/**
	 * @var Html
	 */
	protected $html;

	/**
	 * @var array
	 */
	protected $settings;

	public function __construct( App $app )
	{
		$this->app      = $app;
		$this->html     = $app->make( 'Html' );
		$this->settings = [];
	}

	/**
	 * Add a setting default
	 *
	 * @param string $formId
	 *
	 * @return void
	 */
	public function addSetting( $formId, array $args )
	{
		if( isset( $args['name'] ) ) {
			$this->settings[ $args['name'] ] = $this->getDefault( $args );
		}

		$this->html->addfield( $formId, $args );
	}

	/**
	 * Get the default field value
	 *
	 * @return string
	 */
	public function getDefault( array $args )
	{
		isset( $args['default'] ) ?: $args['default'] = '';
		isset( $args['placeholder'] ) ?: $args['placeholder'] = '';

		if( $args['default'] === ':placeholder' ) {
			$args['default'] = $args['placeholder'];
		}

		return $args['default'];
	}

	/**
	 * Get the default settings
	 *
	 * @return array
	 */
	public function getSettings()
	{
		$this->register();

		return $this->settings;
	}

	/**
	 * Register the settings for each form
	 *
	 * @return void
	 *
	 * @action admin_init
	 */
	public function register()
	{
		if( !empty( $this->settings ) )return;

		$methods = (new ReflectionClass( __CLASS__ ))->getMethods( ReflectionMethod::IS_PROTECTED );

		foreach( $methods as $method ) {
			if( substr( $method->name, 0, 3 ) === 'set' ) {
				$this->{$method->name}();
			}
		}
	}

	protected function setGeneral()
	{
		$formId = 'settings/general';

		$this->html->createForm( $formId, [
			'action' => admin_url( 'options.php' ),
			'nonce'  => $this->app->id . '-settings',
			'submit' => __( 'Save Settings', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'    => 'yesno_inline',
			'name'    => 'general.require.approval',
			'label'   => __( 'Require approval', 'site-reviews' ),
			'default' => true,
			'desc'    => __( 'Set the status of new review submissions to pending.', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'  => 'yesno_inline',
			'name'  => 'general.require.login',
			'label' => __( 'Require login', 'site-reviews' ),
			'desc'  => __( 'Only allow review submissions from registered users.', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'    => 'radio',
			'name'    => 'general.notification',
			'label'   => __( 'Notifications', 'site-reviews' ),
			'default' => 'none',
			'options' => [
				'none'    => __( 'Do not send review notifications', 'site-reviews' ),
				'default' => sprintf( __( 'Send to administrator <code>%s</code>', 'site-reviews' ), get_option( 'admin_email' ) ),
				'custom'  => __( 'Send to one or more email addresses', 'site-reviews' ),
				'webhook' => __( 'Send to <a href="https://slack.com/">Slack</a>', 'site-reviews' ),
			],
		]);

		$this->addSetting( $formId, [
			'type'    => 'text',
			'name'    => 'general.notification_email',
			'label'   => __( 'Send notification emails to', 'site-reviews' ),
			'depends' => [
				'general.notification' => 'custom',
			],
			'placeholder' => __( 'Separate multiple emails with a comma', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'    => 'url',
			'name'    => 'general.webhook_url',
			'label'   => __( 'Webhook URL', 'site-reviews' ),
			'depends' => [
				'general.notification' => 'webhook',
			],
			'desc' => sprintf(
				__( 'To send notifications to Slack, <a href="%s">create a new Incoming WebHook</a> and then paste the provided Webhook URL in the field above.', 'site-reviews' ),
				esc_url( 'https://slack.com/apps/new/A0F7XDUAZ-incoming-webhooks' )
			),
		]);

		$this->addSetting( $formId, [
			'type'    => 'code',
			'name'    => 'general.notification_message',
			'label'   => __( 'Notification template', 'site-reviews' ),
			'rows'    => 9,
			'depends' => [
				'general.notification' => ['custom', 'default', 'webhook'],
			],
			'default' => $this->html->renderTemplate( 'email/templates/review-notification', [], 'return' ),
			'desc' => 'To restore the default text, save an empty template.
				If you are sending notifications to Slack then this template will only be used as a fallback in the event that <a href="https://api.slack.com/docs/attachments">Message Attachments</a> have been disabled.<br>
				Available template tags:<br>
				<code>{review_rating}</code> - The review rating number (1-5)<br>
				<code>{review_title}</code> - The review title<br>
				<code>{review_content}</code> - The review content<br>
				<code>{review_author}</code> - The review author<br>
				<code>{review_email}</code> - The email of the review author<br>
				<code>{review_ip}</code> - The IP address of the review author<br>
				<code>{review_link}</code> - The link to edit/view a review',
		]);
	}

	protected function setForm()
	{
		$formId = 'settings/form';

		$this->html->createForm( $formId, [
			'action' => admin_url( 'options.php' ),
			'nonce'  => $this->app->id . '-settings',
			'submit' => __( 'Save Settings', 'site-reviews' ),
		]);

		$this->html->addfield( $formId, [
			'type'  => 'heading',
			'value' => __( 'Form Labels', 'site-reviews' ),
			'desc'  => __( 'Customize the label text for the review submission form fields.', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.rating.label',
			'label' => __( 'Rating label', 'site-reviews' ),
			'placeholder' => __( 'Your overall rating', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.title.label',
			'label' => __( 'Title label', 'site-reviews' ),
			'placeholder' => __( 'Title of your review', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.content.label',
			'label' => __( 'Content label', 'site-reviews' ),
			'placeholder' => __( 'Your review', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.reviewer.label',
			'label' => __( 'Reviewer label', 'site-reviews' ),
			'placeholder' => __( 'Your name', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.email.label',
			'label' => __( 'Email label', 'site-reviews' ),
			'placeholder' => __( 'Your email', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'textarea',
			'name'  => 'form.terms.label',
			'label' => __( 'Terms label', 'site-reviews' ),
			'placeholder' => __( 'This review is based on my own experience and is my genuine opinion.', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->html->addfield( $formId, [
			'type'  => 'heading',
			'value' => __( 'Form Placeholders', 'site-reviews' ),
			'desc'  => __( 'Customize the placeholder text for the review submission form fields. Use a single space character to disable the placeholder text.', 'site-reviews' ),
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.title.placeholder',
			'class' => 'large-text',
			'label' => __( 'Title placeholder', 'site-reviews' ),
			'placeholder' => __( 'Summarize your review or highlight an interesting detail', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.content.placeholder',
			'class' => 'large-text',
			'label' => __( 'Content placeholder', 'site-reviews' ),
			'placeholder' => __( 'Tell people your review', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.reviewer.placeholder',
			'class' => 'large-text',
			'label' => __( 'Reviewer placeholder', 'site-reviews' ),
			'placeholder' => __( 'Tell us your name', 'site-reviews' ),
			'default' => ':placeholder',
		]);

		$this->addSetting( $formId, [
			'type'  => 'text',
			'name'  => 'form.email.placeholder',
			'class' => 'large-text',
			'label' => __( 'Email placeholder', 'site-reviews' ),
			'placeholder' => __( 'Tell us your email', 'site-reviews' ),
			'default' => ':placeholder',
		]);
	}
}
