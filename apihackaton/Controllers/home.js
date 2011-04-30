events = [
	{
		name : 'SHDH 44',
		date : '7 de mayo',
		place : 'hacker dojo',
		desc : '<span class="description"> <!-- class description is SEO, not css --><p><em>Every DevHouse is unique and special, this one will be a look to the past trying to remember those old school all night events that started it all!</em></p><p>Wake up a little bit late on <strong>May 7th </strong>because you will want to stay till 6 am to join everyone for an epic breakfast after hacking for 15 hours!</p><p><strong>The hacking will start at 3:00 pm at the Hacker dojo.&nbsp;</strong></p><p>At 8:00 pm we will have lighting talks and then a whole night to create awesome projects, brainstorm interesting ideas and have tons of fun.</p><p>At 6:00 am on Sunday we will figure out a place to have breaksfast and celebrate that we survived one of the biggest most awesome hack-a-thons in history!</p><p><strong>This event is sponsored by Scalr and apportable and extremly supported by the Hacker Dojo. </strong></p><p>There is a suggested <strong>donation</strong> of 10 bucks for snacks, drinks and <strong>beer</strong>.</p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align: center;"><a href="https://scalr.net/"><img src="https://scalr.net/site/images/scalr_logo.png" alt="" width="193" height="47"></a></p><p style="text-align: center;"><a href="http://www.apportable.com/"><img src="http://i.imgur.com/7hG2X.png" alt="" width="193" height="62"></a></p><p style="text-align: center;"><a href="hackerdojo.pbworks.com"><img src="https://files.pbworks.com/download/BDPbPygXcM/hackerdojo/34147182/hd_logo_small_res_300px.png" alt="" width="200"></a></p><p style="text-align: center;">&nbsp;</p></span>'
	},
	{
		name : 'Api hackaton',
		date : '30 de abril',
		place : 'Telmex hub',
		desc : '<span class="description"> <!-- class description is SEO, not css --><p>Participa en el API Hackaton 2010, donde podrás demostrar tus habilidades para integrar y componer aplicaciones a partir de los miles de servicios disponibles en el mundo a través de APIs públicas. Queremos ver hasta dónde llega tu imaginación y tu capacidad de implementar una aplicación en línea durante 10 horas.</p><p>Se vale usar cualquier API para integrar voz, fotografías, audio, geolocalización, datos financieros, datos poblacionales, tiempo, activity streams, etc.&nbsp;</p><p>No hay limitaciones en lenguaje ni plataforma.&nbsp;</p><p>Habrá premios para las aplicaciones que de acuerdo con los participantes sean las mejores.&nbsp;</p><ul><li>Primer premio: Un iPad WiFi de 16 Gb + 300 USD de crédito en Twilio</li><li>Segundo premio: 200 USD de crédito en Twilio</li><li>Tercer premio: 100 USD de crédito en Twilio</li></ul><p>El cupo está limitado así que es recomendable que te registres a la brevedad.&nbsp;</p><p>&nbsp;</p><p><strong>¿Qué tienes que traer?</strong></p><p>Simplemente tus herramientas de trabajo (laptop). Si no tienes una, es posible solicitar una a préstamo en TelmexHub. Las comidas y bebidas serán patrocinadas por Aspire Labs.</p><p>&nbsp;</p><p><strong>Patrocinadores</strong></p><p>El evento es amablemente patrocinado por Twilio, Aspire Labs y Software Guru</p></span>'		
	}
]


exports.home = function(req, res){
	res.state = 'home';
	res.render('home/home', { locals: {events : events}});
}
