import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import { Postagem } from '../../../models/Postagem';
import { Link, useNavigate } from 'react-router-dom';
import { getAll } from '../../../service/Service';
import './ListaPostagens.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaPostagens() {
  

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  )

  const userId = useSelector<TokenState, TokenState["id"]>(
    (state) => state.id
  )


  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const history = useNavigate();

  useEffect(() => {
    if (token === '') {
      alert('Sem token, não pode ficar aqui não');
      history('/login');
    }
  }, [token]);

  async function getAllPostagens() {
    await getAll('/postagens', setPostagens, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getAllPostagens();
  }, [postagens.length]);

  return (
    <div className='listaPost'>
      {postagens.map((post) => (
        <Box m={4} >
          <Card variant='outlined' style={{padding: '8px'}}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {post.titulo}
              </Typography>
              <Typography variant="h5" component="h2">
                {post.texto}
              </Typography>
              <Typography variant="body1" component="p">
                Tema: {post.tema?.descricao}
              </Typography>
              <Typography variant="body1" component="p">
                Postado por: {post.usuario?.nome}
              </Typography>
              <Typography variant="body1" component="p">
                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */}
                Data: {Intl.DateTimeFormat('pt-BR', {dateStyle: 'full', timeStyle: 'medium'}).format(new Date(post.data))}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/editarPostagem/${post.id}`}>
              <Button color="primary" variant="contained" size="small" fullWidth>
                Editar
              </Button>
              </Link>
              <Link to={`/apagarPostagem/${post.id}`}>
              <Button color="error" variant="contained" size="small" fullWidth>
                Deletar
              </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  );
}

export default ListaPostagens;