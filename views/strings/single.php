<tr class="glsr-string">
	<td class="glsr-string-original column-primary">
		<p>{{ data.msgid }}</p>
		<p class="row-actions">
			<span class="delete"><a href="#" class="delete" aria-label="<?= __( 'Delete translation string', 'site-reviews' );?>"><?= __( 'Delete', 'site-reviews' ); ?></a></span>
		</p>
		<button type="button" class="toggle-row">
			<span class="screen-reader-text"><?= __( 'Show custom translation', 'site-reviews' ); ?></span>
		</button>
	</td>
	<td class="glsr-string-translation">
		<input type="hidden" name="{{ data.prefix }}[settings][strings][{{ data.index }}][id]" value="{{ data.id }}">
		<textarea rows="2" name="{{ data.prefix }}[settings][strings][{{ data.index }}][single]">{{ data.single }}</textarea>
		<span class="description">{{ data.desc }}</span>
	</td>
</tr>
