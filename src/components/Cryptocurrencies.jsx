import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
const { Title } = Typography


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  },[cryptosList, searchTerm])

  if(isFetching) return 'Loading...'

  return (
    <>
    {!simplified && <div className='search-crypto'>
      <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Find the best coins!</Link></Title>
      <Input placeholder='search crypto currency' onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>}
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          <Link to={`/crypto/${currency.id}`}>
            <Card title={`${currency.rank}. ${currency.name}`} 
              extra={ <img className='crypto-image' src={currency.iconUrl} alt='crypto img' />}
              hoverable
            >
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default Cryptocurrencies
