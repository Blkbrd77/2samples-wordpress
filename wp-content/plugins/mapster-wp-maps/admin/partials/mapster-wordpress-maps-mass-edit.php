<?php
	acf_form_head();

	$plugin_i18n = new Mapster_Wordpress_Maps_i18n();
	$translation_strings_mass_edit = $plugin_i18n->get_mapster_strings()['mass_edit']
?>
	<style>
	.acf-form-submit {
		margin: 10px;
	}
	</style>
	<div class="wrap">

		<h1><?php echo $translation_strings_mass_edit["Mass Edit Header"]; ?></h1>
		<div style="display: flex;">
			<div style="width: 50%;">
				<h3><?php echo $translation_strings_mass_edit["Mass Edit Select"]; ?></h3>
				<p><?php echo $translation_strings_mass_edit["Mass Edit Search"]; ?><p>
					<?php
						acf_form(array(
							'fields' => array('field_6186d543b6f7f'),
							'form' => false,
						));
					?>
				<p><?php echo $translation_strings_mass_edit["Mass Edit Features"]; ?></p>
					<?php
						acf_form(array(
							'fields' => array('field_61637b0892e4a', 'field_61637b2fb1cc2', 'field_61637b3fb1cc3'),
							'form' => false
						));
					?>
			</div>
			<div style="width: 50%; padding-left: 20px;">
				<h3><?php echo $translation_strings_mass_edit["Mass Edit Edit"]; ?></h3>
				<div class="mapster-mass-edit">
		      <div style="margin-top: 10px;">
		        <div id="feature-type-point" class='nav-tab nav-tab-active'><?php echo $translation_strings_mass_edit["Mass Edit Points"]; ?> <span></span></div>
		        <div id="feature-type-line" class='nav-tab'><?php echo $translation_strings_mass_edit["Mass Edit Lines"]; ?> <span></span></div>
		        <div id="feature-type-polygon" class='nav-tab'><?php echo $translation_strings_mass_edit["Mass Edit Polygons"]; ?> <span></span></div>
		        <div id="feature-type-popup" class='nav-tab'><?php echo $translation_strings_mass_edit["Mass Edit Popups"]; ?> <span></span></div>
		      </div>
		      <hr style="clear: both;"/>
					<div id="feature-type-point-options" class="nav-box nav-box-active">
						<?php
							acf_form(array(
								'field_groups' => array('group_6163732e0426e'),
								'form' => false
							));
						?>
					</div>
					<div id="feature-type-line-options" class="nav-box">
						<?php
							acf_form(array(
								'field_groups' => array('group_616377d62836b'),
								'form' => false
							));
						?>
					</div>
					<div id="feature-type-polygon-options" class="nav-box">
						<?php
							acf_form(array(
								'field_groups' => array('group_616379566202f'),
								'form' => false
							));
						?>
					</div>
					<div id="feature-type-popup-options" class="nav-box">
						<?php
							acf_form(array(
								'field_groups' => array('group_6163d357655f4'),
								'form' => false
							));
						?>
						<?php
							acf_form(array(
								'field_groups' => array('group_626492b319912'),
								'form' => false
							));
						?>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<button class="do-mass-edit button button-primary"><?php echo $translation_strings_mass_edit["Mass Edit Button"]; ?></button>
		<div class='mapster-map-loader'>
			<svg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke='#333'>
				<g fill='none' fill-rule='evenodd'>
						<g transform='translate(1 1)' stroke-width='2'>
								<circle stroke-opacity='.5' cx='18' cy='18' r='18'/>
								<path d='M36 18c0-9.94-8.06-18-18-18'>
										<animateTransform
												attributeName='transform'
												type='rotate'
												from='0 18 18'
												to='360 18 18'
												dur='1s'
												repeatCount='indefinite'/>
								</path>
						</g>
				</g>
			</svg>
		</div>
		<div id="mass-edit-result" style="display: none; margin-top: 10px;">
			<span></span> <?php echo $translation_strings_mass_edit["Mass Edit Edited"]; ?>
		</div>

	</div>
